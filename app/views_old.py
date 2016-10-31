# -*- coding: UTF-8 -*-
from flask import render_template, flash, redirect, url_for, request, g, jsonify, abort
from flask.ext.login import login_user, logout_user, current_user, login_required
from sqlalchemy import desc

from app import app, login_manager, db
from app.forms import LoginForm, RegistrationForm, ChangePasswordForm
from app.models import *
from datetime import datetime, timedelta

@login_manager.user_loader
def load_user(id):
    """
        Used to get user by id
    """
    return User.query.get(int(id))

@app.before_request
def before_request():
    """
        Used to get current user
    """
    g.user = current_user

@app.route('/', methods=['GET', 'POST'])
@app.route('/index', methods=['GET', 'POST'])
def index():
    today = datetime.now()
    tomorrow = today + timedelta(days=1)
    monday = today - timedelta(days=today.weekday())
    sunday = monday + timedelta(days=6)
   
    lessons = Lesson.query.join(Course, Lesson.course_id == Course.id)\
                          .join(Timesheet, Lesson.timesheet_id == Timesheet.id)\
                          .filter(Lesson.date.between(monday.strftime('%Y-%m-%d'), sunday.strftime('%Y-%m-%d')))\
                          .order_by(Timesheet.dow)\
                          .order_by(Timesheet.hod)\
                          .order_by(Timesheet.moh)
    try:
        if 'course_id' in request.form and request.form['course_id']:
            lessons = lessons.filter(Lesson.course_id == request.form['course_id'])
        if g.user and g.user.is_authenticated and g.user.teacher:
            lessons = lessons.filter(Course.teacher_id == g.user.teacher.id)
        else:
            if 'teacher_id' in request.form and request.form['teacher_id']:
                lessons = lessons.filter(Course.teacher_id == request.form['teacher_id'])
        if 'dow' in request.form and request.form['dow']:
            lessons = lessons.filter(Timesheet.dow == request.form['dow'])
        if 'place' in request.form and request.form['place']:
            lessons = lessons.filter(Timesheet.place_id == request.form['place'])
    except:
        flash("Ошибка!", 'error')
    finally:
        lessons = lessons.all()
    teachers = Teacher.query.all()
    if g.user and g.user.is_authenticated and g.user.teacher:
        courses = Course.query.filter(Course.teacher_id == g.user.teacher.id).all()
    else:    
        courses = Course.query.all()
    places = Place.query.all()
    return render_template("index.html",
                               title="Главная",
                               lessons=lessons,
                               courses = courses,
                               teachers=teachers,
                               places=places,
                               user=g.user)



@app.route('/course/<course_id>', methods=['GET', 'POST'])
def show_course(course_id):
    if not g.user.is_admin and not g.user.teacher:
        abort(404)
    course = Course.query.get(course_id)
    if not course:
        abort(404)
    elif g.user.teacher and g.user.teacher.id != course.teacher_id:
        abort(403)

    today = datetime.now()
    month_start = today.replace(day=1)
    month_end = month_start.replace(month=month_start.month+1)
    lessons = Lesson.query.filter(Lesson.course_id == course_id)\
                          .filter(Lesson.date.between(month_start.strftime('%d-%m-%Y'), month_end.strftime('%d-%m-%Y')))\
                          .order_by(Lesson.date)
    students = Student_course_cost.query.filter(Student_course_cost.course_id == course_id).all()
    all_students = Student.query.filter(Student.id.notin_([row.student_id for row in students])).all()                    
    lespresences = Presence.query.join(Lesson, Presence.lesson_id == Lesson.id )\
                                      .filter(Lesson.course_id == course_id)\
                                      .filter(Lesson.date.between(month_start.strftime('%d-%m-%Y'), month_end.strftime('%d-%m-%Y')))\
                                      .order_by(Lesson.date)
    
    
    if request.method == "POST":
        try:
            if 'modal_payment_id' in request.form and request.form['modal_payment_id']:
                payment = Payment.query.get(request.form['modal_payment_id'])
                if payment:
                    if request.form['modal_pay'] != '':
                        payment.amount = int(request.form['modal_pay'])
                    else:     
                        payment.amount = 0
                    if request.form['modal_cost_extra'] != '':
                        payment.amount_extra = int(request.form['modal_cost_extra'])
                    else:     
                        payment.amount_extra = 0 
                    payment.comment_extra = request.form['modal_cost_extra_comment']
                    db.session.commit()
                    flash("Оплата изменена!")
                else:
                    flash("Ошибка!", "error")

            elif 'modal_pay' in request.form:
                now_date = request.form['lesson_date']
                student_id = request.form['student_id']
                payments_var = Payment.query.filter(Payment.date == now_date).filter(Payment.student_id == student_id).filter(Payment.course_id == course_id).all()
                if len(payments_var) == 0:   
                        student_id = request.form['student_id']
                        if request.form['modal_pay'] != '':
                            pay = int(request.form['modal_pay'])
                        else: 
                            pay = 0
                        if request.form['modal_cost_extra'] != '':
                            pay_extra = int(request.form['modal_cost_extra'])
                        else: 
                            pay_extra = 0        
                        pay_extra_comment = request.form['modal_cost_extra_comment']
                        
                        
                        payment = Payment(student_id, course_id, pay, pay_extra, pay_extra_comment, now_date)
                        db.session.add(payment)
                        db.session.commit()
                        flash("Оплата занесена в систему!")
                else:
                   flash("Оплата в этот день уже была произведена - отредактируйте ее!") 

            elif 'modal_timesheet_id' in request.form:
                    dow = int(request.form['modal_dow'])
                    hod = int(request.form['modal_hod']) % 24
                    moh = int(request.form['modal_moh']) % 60
                    hoe = int(request.form['modal_hoe']) % 24
                    moe = int(request.form['modal_moe']) % 60
                    if request.form['modal_timesheet_id'] == '':
                        course = Course.query.get(course_id)
                        timesheet = Timesheet.query.join(Course, Timesheet.course_id == Course.id)\
                                                    .filter(Course.teacher_id == course.teacher_id)\
                                                    .filter(Timesheet.dow == dow)\
                                                    .filter(Timesheet.hod == hod).first()
                        if timesheet:
                            flash("В это время у преподавателя уже стоит занятие!")
                        else:
                            timesheet = Timesheet.query.filter(Timesheet.place_id == request.form['modal_place'])\
                                                        .filter(Timesheet.dow == dow)\
                                                        .filter(Timesheet.hod == hod).first()
                            if timesheet:
                                flash("В это время в этой аудитории уже стоит занятие!")
                            else:
                                timesheet = Timesheet(course_id,
                                                      request.form['modal_place'],
                                                      dow,
                                                      hod,
                                                      moh,
                                                      hoe,
                                                      moe)
                                db.session.add(timesheet)
                                db.session.commit()
                                reform_lessons(course_id)
                                flash("Успешно добавлен!")
                    else:
                        course = Course.query.get(course_id)
                        timesheet = Timesheet.query.join(Course, Timesheet.course_id == Course.id)\
                                                    .filter(Timesheet.id != request.form['modal_timesheet_id'])\
                                                    .filter(Course.teacher_id == course.teacher_id)\
                                                    .filter(Timesheet.dow == dow)\
                                                    .filter(Timesheet.hod == hod).first()
                        if timesheet:
                            flash("В это время у преподавателя уже стоит занятие!")
                        else:
                            timesheet = Timesheet.query.filter(Timesheet.place_id == request.form['modal_place'])\
                                                       .filter(Timesheet.id != request.form['modal_timesheet_id'])\
                                                       .filter(Timesheet.dow == dow)\
                                                       .filter(Timesheet.hod == hod).first()
                            if timesheet:
                                flash("В это время в этой аудитории уже стоит занятие!")
                            else:
                                timesheet = Timesheet.query.get(request.form['modal_timesheet_id'])
                                timesheet.place_id = request.form['modal_place']
                                timesheet.dow = dow
                                timesheet.hod = hod
                                timesheet.moh = moh
                                timesheet.hoe = hoe
                                timesheet.moe = moe
                                db.session.commit()
                                flash("Расписание успешно изменено")
            elif 'modal_id' in request.form:
                    if request.form['modal_id'] == '':
                        course = Student_course_cost.query.filter(Student_course_cost.student_id == request.form['modal_student_id'])\
                                    .filter(Student_course_cost.course_id == course_id).first()
                        if course:
                            flash("Такой ученик уже есть в системе!")
                        else:
                            try:
                                cost = int(request.form['modal_cost'])
                                comment = request.form['modal_cost_comment']
                            except:
                                cost = 0
                                flash("Ошибка: Поле стоимости содержит неправильное значение!", 'error')
                            course = Student_course_cost(course_id,
                                                         request.form['modal_student_id'],
                                                         cost,
                                                         comment)
                            db.session.add(course)
                            db.session.commit()
                            flash("Успешно добавлен!")

                    else:
                        course = Student_course_cost.query.get(request.form['modal_id'])
                        try:
                            course.comment = request.form['modal_cost_comment']
                            course.cost = int(request.form['modal_cost'])
                            db.session.commit()
                            flash("Успешно изменен!")
                        except:
                            flash("Ошибка: Поле стоимости содержит неправильное значение!", 'error') 

            
            elif 'modal_id_course' in request.form:
                if request.form['modal_id_course'] == '':
                    if request.form['modal_title_course'] != '':
                        try:
                            cost = int(request.form['modal_cost_course'])
                        except:
                            cost = 0
                            flash("Ошибка: Поле 'Плата преподавалею' содержит не правильно значение!", 'error')
                        try:
                            student_cost = int(request.form['modal_student_cost_course'])
                        except:
                            student_cost = 0
                            flash("Ошибка: Поле 'Стоимость для учеников' содержит не правильно значение!", 'error')
                        start_date = datetime.strptime(request.form['modal_start_date_course'], '%d.%m.%Y')
                        end_date = datetime.strptime(request.form['modal_end_date_course'], '%d.%m.%Y')
                        course_new = Course(request.form['modal_title_course'],
                                        request.form['modal_discipline_id_course'],
                                        request.form['modal_teacher_id_course'],
                                        cost,
                                        student_cost,
                                        start_date,
                                        end_date)
                        db.session.add(course_new)
                        db.session.commit()
                        flash("Успешно добавлено!")
                        return redirect(url_for('show_course', course_id=course_new.id))
                    else:
                        flash("Ошибка: Поле названия пустое!", 'error')
                else:
                    if request.form['modal_title_course'] != '':
                        course = Course.query.get(course_id)
                        course.title = request.form['modal_title_course']
                        course.discipline_id = request.form['modal_discipline_id_course']
                        course.teacher_id = request.form['modal_teacher_id_course']
                        try:
                            course.cost = int(request.form['modal_cost_course'])
                        except:
                            flash("Ошибка: Поле 'Плата преподавателю' содержит неправильное значение!", 'error')
                        try:
                            course.student_cost = int(request.form['modal_student_cost_course'])
                        except:
                            flash("Ошибка: Поле 'Стоимость для учеников' содержит не правильно значение!", 'error')
                        course.start_date = datetime.strptime(request.form['modal_start_date_course'], '%d.%m.%Y')
                        course.end_date = datetime.strptime(request.form['modal_end_date_course'], '%d.%m.%Y')
                        db.session.commit()
                        flash("Успешно изменено!")
                    else:
                        flash("Ошибка: Поле названия пустое!", 'error')

            elif 'modal_lesson_id' in request.form:
                # homework
                homework_id = request.form['homework_id']
                title = request.form['modal_title']
                lesson_id = request.form['modal_lesson_id']
                homework = Homework.query.get(homework_id)
                if homework:
                    student_ids = request.form.getlist('student_ids')
                    for student_id in student_ids:
                        task = Task(homework_id, lesson_id, student_id, title)
                        for arg in homework.args.all():
                            targ = Taskarg(arg.id, request.form.get(str(arg.title), ''))
                            task.args.append(targ)
                        db.session.add(task)
                    db.session.commit()
                    flash('ДЗ задано!')
                else:
                    flash("Ошибка редактирования", 'error')
            elif 'modal_text' in request.form:
                # adds text
                lesson = Lesson.query.get(request.form['modal_abstract_lesson_id'])
                if lesson:
                    lesson.title = request.form['modal_lesson_title']
                    lesson.text = request.form['modal_text']
                    db.session.commit()
                    flash("Конспект сохранен!")
                else:
                    flash("Занятие не найдено!", 'error')

            elif 'month' in request.form and request.form['month']:
                selected_month = int(request.form['month'])
                if (selected_month <= 11) and (selected_month >= 9):
                    month_start2 = month_start.replace(month=selected_month)
                    month_end2 = month_start2.replace(month=month_start2.month+1)
                elif (selected_month == 12): 
                    month_start2 = month_start.replace(month=selected_month)
                    month_end2 = month_start2.replace(month=1) 
                    month_end2 = month_end2.replace(year=month_end2.year+1)
                elif (selected_month >= 1) and (selected_month <= 8):
                    month_start2 = month_start.replace(month=selected_month)
                    month_start2 = month_start2.replace(year=month_start2.year+1)
                    month_end2 = month_start2.replace(month=month_start2.month+1)     
                lessons = Lesson.query.filter(Lesson.course_id == course_id)\
                          .filter(Lesson.date.between(month_start2.strftime('%d-%m-%Y'), month_end2.strftime('%d-%m-%Y')))\
                          .order_by(Lesson.date)
                lespresences = Presence.query.join(Lesson, Presence.lesson_id == Lesson.id )\
                                          .filter(Lesson.course_id == course_id)\
                                          .filter(Lesson.date.between(month_start2.strftime('%d-%m-%Y'), month_end2.strftime('%d-%m-%Y')))\
                                          .order_by(Lesson.date).all()              
                summ_all = 0
                summ_done = 0 
                result = []

                for student in students:
                    student_in_course = Student_course_cost.query.filter(Student_course_cost.student_id == student.student.id)\
                                                        .filter(Student_course_cost.course_id == course_id).first()
                    if student_in_course:
                        cost = student_in_course.cost
                    alll = Lesson.query.filter(Lesson.course_id == course_id)\
                                           .filter(Lesson.date.between(month_start2.strftime('%d-%m-%Y'), month_end2.strftime('%d-%m-%Y')))\
                                           .filter(Lesson.status != 2).all()
                    pres = Lesson.query.join(Presence, Presence.lesson_id == Lesson.id)\
                                              .filter(Lesson.course_id == course_id)\
                                              .filter(Presence.student_id == student.student.id)\
                                              .filter(Lesson.date.between(month_start2.strftime('%d-%m-%Y'), month_end2.strftime('%d-%m-%Y')))\
                                              .filter(Presence.status == 1).all()  
                    not_pres = Lesson.query.join(Presence, Presence.lesson_id == Lesson.id)\
                                              .filter(Lesson.course_id == course_id)\
                                              .filter(Presence.student_id == student.student.id)\
                                              .filter(Lesson.date.between(month_start2.strftime('%d-%m-%Y'), month_end2.strftime('%d-%m-%Y')))\
                                              .filter(Presence.status == -1).all()   
                    not_pres_2 = Lesson.query.join(Presence, Presence.lesson_id == Lesson.id)\
                                              .filter(Lesson.course_id == course_id)\
                                              .filter(Presence.student_id == student.student.id)\
                                              .filter(Lesson.date.between(month_start2.strftime('%d-%m-%Y'), month_end2.strftime('%d-%m-%Y')))\
                                              .filter(Presence.status == 2).all()  
                    payments = Payment.query.filter(Payment.student_id == student.student.id)\
                                                .filter(Payment.course_id == course_id)\
                                                .filter(Payment.date.between(month_start2.strftime('%d-%m-%Y'), month_end2.strftime('%d-%m-%Y'))).all()   
                    this_month_payments = 0
                    for payment in payments:
                        this_month_payments += payment.amount
                    all_payments = 0                                                                                                                       
                    payments = Payment.query.filter(Payment.student_id == student.student.id)\
                                                .filter(Payment.course_id == course_id).all()
                    for payment in payments:
                            all_payments += payment.amount                                
                    prev_all_presence = Lesson.query.join(Presence, Presence.lesson_id == Lesson.id)\
                                                        .filter(Lesson.course_id == course_id)\
                                                        .filter(Presence.student_id == student.student.id)\
                                                        .filter(Lesson.date < month_start2.strftime('%d-%m-%Y'))\
                                                        .filter(Presence.status != 2).all()
                    prev_month_debt = len(prev_all_presence) * cost
                    prev_month_payments = all_payments - this_month_payments - prev_month_debt
                    all_presence = Lesson.query.join(Presence, Presence.lesson_id == Lesson.id)\
                                                   .filter(Lesson.course_id == course_id)\
                                                   .filter(Presence.student_id == student.student.id)\
                                                   .filter(Lesson.date < month_end2.strftime('%d-%m-%Y'))\
                                                   .filter(Presence.status != 2).all()
                    all_debt = len(all_presence) * cost
                    debt = all_payments - all_debt
                    result.append({    'student_id': student.id,
                                       'alll': len(alll),
                                       'pres': len(pres),
                                       'uv': len(not_pres_2),
                                       'not_pres': len(not_pres),
                                       'student': student,
                                       'cost': cost,
                                       'this_month_payments': this_month_payments,
                                       'prev_month_payments': prev_month_payments,
                                       'debt': debt})
                    summ_all += cost * len(alll)
                    summ_done += cost * (len(pres) + len(not_pres))
        except:
            flash("Ошибка!", 'error')
        finally:
            lessons = lessons.all()

    timesheets = Timesheet.query.filter(Timesheet.course_id == course_id).order_by(Timesheet.dow, Timesheet.hod).all()
    course = Course.query.get(course_id)
    if not course:
        abort(404)        
    teachers = Teacher.query.all()
    places = Place.query.all()
    disciplines = Discipline.query.all()
    homeworks = Homework.query.all()
    students = Student_course_cost.query.filter(Student_course_cost.course_id == course_id).all()
    if not ('month' in request.form):
        summ_all = 0
        summ_done = 0 
        result = []
        try:  
    
                for student in students:
                    student_in_course = Student_course_cost.query.filter(Student_course_cost.student_id == student.student.id)\
                                                        .filter(Student_course_cost.course_id == course_id).first()
                    if student_in_course:
                        cost = student_in_course.cost
                    alll = Lesson.query.filter(Lesson.course_id == course_id)\
                                           .filter(Lesson.date.between(month_start.strftime('%d-%m-%Y'), month_end.strftime('%d-%m-%Y')))\
                                           .filter(Lesson.status != 2).all()
                    pres = Lesson.query.join(Presence, Presence.lesson_id == Lesson.id)\
                                              .filter(Lesson.course_id == course_id)\
                                              .filter(Presence.student_id == student.student.id)\
                                              .filter(Lesson.date.between(month_start.strftime('%d-%m-%Y'), month_end.strftime('%d-%m-%Y')))\
                                              .filter(Presence.status == 1).all()  
                    not_pres = Lesson.query.join(Presence, Presence.lesson_id == Lesson.id)\
                                              .filter(Lesson.course_id == course_id)\
                                              .filter(Presence.student_id == student.student.id)\
                                              .filter(Lesson.date.between(month_start.strftime('%d-%m-%Y'), month_end.strftime('%d-%m-%Y')))\
                                              .filter(Presence.status == -1).all()   
                    not_pres_2 = Lesson.query.join(Presence, Presence.lesson_id == Lesson.id)\
                                              .filter(Lesson.course_id == course_id)\
                                              .filter(Presence.student_id == student.student.id)\
                                              .filter(Lesson.date.between(month_start.strftime('%d-%m-%Y'), month_end.strftime('%d-%m-%Y')))\
                                              .filter(Presence.status == 2).all()  
                    payments = Payment.query.filter(Payment.student_id == student.student.id)\
                                                .filter(Payment.course_id == course_id)\
                                                .filter(Payment.date.between(month_start.strftime('%d-%m-%Y'), month_end.strftime('%d-%m-%Y'))).all()   
                    this_month_payments = 0
                    for payment in payments:
                        this_month_payments += payment.amount
                    all_payments = 0                                                                                                                       
                    payments = Payment.query.filter(Payment.student_id == student.student.id)\
                                                .filter(Payment.course_id == course_id).all()
                    for payment in payments:
                            all_payments += payment.amount                                
                    prev_all_presence = Lesson.query.join(Presence, Presence.lesson_id == Lesson.id)\
                                                        .filter(Lesson.course_id == course_id)\
                                                        .filter(Presence.student_id == student.student.id)\
                                                        .filter(Lesson.date < month_start.strftime('%d-%m-%Y'))\
                                                        .filter(Presence.status != 2).all()
                    prev_month_debt = len(prev_all_presence) * cost
                    prev_month_payments = all_payments - this_month_payments - prev_month_debt
                    all_presence = Lesson.query.join(Presence, Presence.lesson_id == Lesson.id)\
                                                   .filter(Lesson.course_id == course_id)\
                                                   .filter(Presence.student_id == student.student.id)\
                                                   .filter(Lesson.date < month_end.strftime('%d-%m-%Y'))\
                                                   .filter(Presence.status != 2).all()
                    all_debt = len(all_presence) * cost
                    debt = all_payments - all_debt
                    result.append({    'student_id': student.id,
                                       'alll': len(alll),
                                       'pres': len(pres),
                                       'uv': len(not_pres_2),
                                       'not_pres': len(not_pres),
                                       'student': student,
                                       'cost': cost,
                                       'this_month_payments': this_month_payments,
                                       'prev_month_payments': prev_month_payments,
                                       'debt': debt})
                    summ_all += cost * len(alll)
                    summ_done += cost * (len(pres) + len(not_pres))
        except:
            flash("Ошибка!", 'error')
            result = None

    return render_template("course.html",
                               title=course.title,
                               lessons=lessons,
                               result=result,
                               today = today,
                               all_students=all_students,
                               course = course,
                               homeworks=homeworks,
                               timesheets = timesheets,
                               lespresences=lespresences,
                               students=students,
                               teachers=teachers,
                               disciplines=disciplines,
                               places=places,
                               user=g.user)




@app.route('/lessonsheet', methods=['GET', 'POST'])
def lessonsheet():
    today = datetime.now()
    tomorrow = today + timedelta(days=1)
    monday = today - timedelta(days=today.weekday())
    sunday = monday + timedelta(days=6)
   
    lessons = Lesson.query.join(Course, Lesson.course_id == Course.id)\
                          .join(Timesheet, Lesson.timesheet_id == Timesheet.id)\
                          .filter(Lesson.date.between(monday.strftime('%Y-%m-%d'), sunday.strftime('%Y-%m-%d')))\
                          .order_by(Timesheet.dow)\
                          .order_by(Timesheet.hod)\
                          .order_by(Timesheet.moh)
    try:
        if 'course_id' in request.form and request.form['course_id']:
            lessons = lessons.filter(Lesson.course_id == request.form['course_id'])
        if g.user and g.user.is_authenticated and g.user.teacher:
            lessons = lessons.filter(Course.teacher_id == g.user.teacher.id)
        else:
            if 'teacher_id' in request.form and request.form['teacher_id']:
                lessons = lessons.filter(Course.teacher_id == request.form['teacher_id'])
        if 'dow' in request.form and request.form['dow']:
            lessons = lessons.filter(Timesheet.dow == request.form['dow'])
        if 'place' in request.form and request.form['place']:
            lessons = lessons.filter(Timesheet.place_id == request.form['place'])
    except:
        flash("Ошибка!", 'error')
    finally:
        lessons = lessons.all()
    teachers = Teacher.query.all()
    if g.user and g.user.is_authenticated and g.user.teacher:
        courses = Course.query.filter(Course.teacher_id == g.user.teacher.id).all()
    else:    
        courses = Course.query.all()
    places = Place.query.all()
    return render_template("lessonsheet.html",
                               title="Расписание занятий",
                               lessons=lessons,
                               courses = courses,
                               teachers=teachers,
                               places=places,
                               user=g.user)

@app.route('/', methods=['GET', 'POST'])
@app.route('/menar-abakus-cw', methods=['GET', 'POST'])
@login_required
def menarabakuscw():
    return render_template("menar-abakus-cw.html",
                               title="Счет на абакусе",
                               user=g.user)

@app.route('/', methods=['GET', 'POST'])
@app.route('/menar-flash-cw', methods=['GET', 'POST'])
@login_required
def menarflashcw():
    return render_template("menar-flash-cw.html",
                               title="Флэш карты",
                               user=g.user)

@app.route('/', methods=['GET', 'POST'])
@app.route('/menar-mental-cw', methods=['GET', 'POST'])
@login_required
def menarmentalcw():
    return render_template("menar-mental-cw.html",
                               title="Счет на скорость",
                               user=g.user)                                   

@app.route('/', methods=['GET', 'POST'])
@app.route('/menar-dance', methods=['GET', 'POST'])
@login_required
def menardance():
    return render_template("menar-dance.html",
                               title="Abakus-Dance",
                               user=g.user)

@app.route('/games', methods=['GET'])
@login_required
def games():
    return render_template("games.html",
                               title="Игры Абакус",
                               user=g.user)
@app.route('/documents', methods=['GET'])
@login_required
def documents():
    return render_template("documents.html",
                               title="Учебные материалы",
                               user=g.user)
@app.route('/support', methods=['GET'])
@login_required
def support():
    return render_template("support.html",
                               title="Служба поддержки",
                               user=g.user)

@app.route('/students', methods=['GET', 'POST'])
@login_required
def show_students():
    """
        View of list of students
    """
    if not g.user.is_admin:
        abort(404)
    try:
        if request.method == "POST":
            if 'modal_id' in request.form:
                if request.form['modal_id'] == '':
                    if request.form['modal_fio'] != '':
                        user = User(request.form['modal_username'], request.form['modal_password'], request.form['modal_email'])
                        if request.form['modal_age'] == '':
                            user.student = Student(request.form['modal_fio'],
                                               request.form['modal_parent'],
                                               request.form['modal_phone'],
                                               datetime.strptime('01.01.1900', '%d.%m.%Y'))
                        else:
                            user.student = Student(request.form['modal_fio'],
                                               request.form['modal_parent'],
                                               request.form['modal_phone'],
                                               datetime.strptime(request.form['modal_age'], '%d.%m.%Y'))
                        db.session.add(user)
                        db.session.commit()
                        flash("Успешно добавлено!")
                        return redirect(url_for('show_student', student_id=user.student.id))
                    else:
                        flash("Ошибка: Поле ФИО пустое!", 'error')
                else:
                    if request.form['modal_fio'] != '':
                        student = Student.query.get(request.form['modal_id'])
                        if student:
                            student.user.username = request.form['modal_username']
                            student.user.password = request.form['modal_password']
                            student.user.email = request.form['modal_email']
                            student.fio = request.form['modal_fio']
                            student.parent = request.form['modal_parent']
                            student.phone = request.form['modal_phone']
                            student.age = datetime.strptime(request.form['modal_age'], '%d.%m.%Y')
                            db.session.commit()
                            flash("Успешно изменено!")
                        else:
                            flash("Ошибка: такой студент не найден!", 'error')
                    else:
                        flash("Ошибка: Поле ФИО пустое!", 'error')
                students = Student.query.all()
            else:
                students = Student.query.filter(Student.fio.ilike('%'+request.form['fio']+'%'))\
                                        .filter(Student.parent.ilike('%'+request.form['parent']+'%'))\
                                        .filter(Student.phone.like('%'+request.form['phone']+'%')).all()
        else:
            students = Student.query.all()
    except:
        flash("Ошибка!", 'error')
        students = Student.query.all()
    return render_template("students.html",
                           title="Ученики",
                           students=students,
                           user=g.user)

@app.route('/delete_student', methods=['POST'])
@login_required
def delete_student():
    """
        delete student
    """
    if not g.user.is_admin:
        return jsonify(res=0), 403
    student_id = request.form['id']
    student = Student.query.get(student_id)
    if student:
        for course in student.courses:
            db.session.delete(course)
        for presence in student.lessons:
            db.session.delete(presence)
        for task in student.tasks:
            for taskarg in task.args:
                db.session.delete(taskarg)
            db.session.delete(task)
        for payment in student.payments:
            db.session.delete(payment)
        db.session.delete(student)
        db.session.commit()
        return jsonify(res=1)
    else:
        return jsonify(res=0)

@app.route('/delete_payment', methods=['POST'])
@login_required
def delete_payment():
    """
        delete payment
    """
    if not g.user.is_admin:
        return jsonify(res=0), 403
    payment_id = request.form['id']
    payment = Payment.query.get(payment_id)
    if payment:
        db.session.delete(payment)
        db.session.commit()
        return jsonify(res=1)
    else:
        return jsonify(res=0)

@app.route('/teachers', methods=['GET', 'POST'])
@login_required
def show_teachers():
    """
        View of list of teachers
    """
    if not g.user.is_admin:
        abort(404)
    user = None
    try:
        if request.method == "POST":
            if 'modal_id' in request.form:
                if request.form['modal_id'] == '':
                    if request.form['modal_fio'] != '':
                        user = User(request.form['modal_username'], request.form['modal_password'], '')
                        user.teacher = Teacher(request.form['modal_fio'],
                                               request.form['modal_phone'])
                        db.session.add(user)
                        db.session.commit()
                        flash("Успешно добавлено!")
                    else:
                        flash("Ошибка: Поле ФИО пустое!", 'error')
                else:
                    if request.form['modal_fio'] != '':
                        teacher = Teacher.query.get(request.form['modal_id'])
                        teacher.user.username = request.form['modal_username']
                        teacher.user.password = request.form['modal_password']
                        teacher.fio = request.form['modal_fio']
                        teacher.phone = request.form['modal_phone']
                        db.session.commit()
                        flash("Успешно изменено!")
                    else:
                        flash("Ошибка: Поле ФИО пустое!", 'error')
                teachers = Teacher.query.all()
            else:
                teachers = Teacher.query.filter(Teacher.fio.ilike('%'+request.form['fio']+'%'))\
                .filter(Teacher.phone.like('%'+request.form['phone']+'%')).all()
        else:
            teachers = Teacher.query.all()
    except:
        flash("Ошибка!", 'error')
        teachers = Teacher.query.all()
    return render_template("teachers.html",
                           title="Преподаватели",
                           teachers=teachers,
                           user=g.user)

@app.route('/delete_teacher', methods=['POST'])
@login_required
def delete_teacher():
    """
        delete teacher
    """
    if not g.user.is_admin:
        return jsonify(res=0), 403
    teacher = Teacher.query.get(request.form['id'])
    if teacher:
        for course in teacher.courses:
            aux_delete_course(course.id)
        db.session.delete(teacher)
        db.session.commit()
        return jsonify(res=1)
    else:
        return jsonify(res=0)

@app.route('/teacher/timesheet', methods=['GET', 'POST'])
@login_required
def show_teachers_timesheet():
    """
        Teacher's profile
    """
    today = datetime.now()
    tomorrow = today + timedelta(days=1)
    monday = today - timedelta(days=today.weekday())
    sunday = monday + timedelta(days=6)
   
    lessons = Lesson.query.join(Course, Lesson.course_id == Course.id)\
                          .join(Timesheet, Lesson.timesheet_id == Timesheet.id)\
                          .filter(Lesson.date.between(monday.strftime('%Y-%m-%d'), sunday.strftime('%Y-%m-%d')))\
                          .order_by(Timesheet.dow)\
                          .order_by(Timesheet.hod)\
                          .order_by(Timesheet.moh)
    try:
        if 'course_id' in request.form and request.form['course_id']:
            lessons = lessons.filter(Lesson.course_id == request.form['course_id'])
        if g.user and g.user.is_authenticated and g.user.teacher:
            lessons = lessons.filter(Course.teacher_id == g.user.teacher.id)
        else:
            if 'teacher_id' in request.form and request.form['teacher_id']:
                lessons = lessons.filter(Course.teacher_id == request.form['teacher_id'])
        if 'dow' in request.form and request.form['dow']:
            lessons = lessons.filter(Timesheet.dow == request.form['dow'])
        if 'place' in request.form and request.form['place']:
            lessons = lessons.filter(Timesheet.place_id == request.form['place'])
    except:
        flash("Ошибка!", 'error')
    finally:
        lessons = lessons.all()
    teachers = Teacher.query.all()
    if g.user and g.user.is_authenticated and g.user.teacher:
        courses = Course.query.filter(Course.teacher_id == g.user.teacher.id).all()
    else:    
        courses = Course.query.all()
    places = Place.query.all()
    return render_template("index.html",
                               title="Расписание",
                               lessons=lessons,
                               courses = courses,
                               teachers=teachers,
                               places=places,
                               user=g.user)

    # tdate = datetime.now().strftime('%Y-%m-%d')
    # try:
    # # if True:
    #     if g.user and g.user.is_authenticated and g.user.teacher and request.method == "POST":

    #             timesheets = Timesheet.query.join(Course, Timesheet.course_id == Course.id)\
    #                                     .filter(Course.start_date < tdate)\
    #                                     .filter(Course.end_date > tdate)
    #             timesheets = timesheets.filter(Course.teacher_id == g.user.teacher.id)
    #             if request.form['dow']:
    #                 timesheets = timesheets.filter(Timesheet.dow == request.form['dow'])
    #             if request.form['place']:
    #                 timesheets = timesheets.filter(Timesheet.place_id == request.form['place'])
    #             timesheets = timesheets.order_by(Timesheet.dow).order_by(Timesheet.hod)\
    #                                    .order_by(Timesheet.moh).all()

    #     else:
    #         timesheets = Timesheet.query.join(Course, Timesheet.course_id == Course.id)\
    #                                     .filter(Course.start_date < tdate)\
    #                                     .filter(Course.end_date > tdate)\
    #                                     .filter(Course.teacher_id == g.user.teacher.id)\
    #                                     .order_by(Timesheet.dow).order_by(Timesheet.hod)\
    #                                     .order_by(Timesheet.moh).all()

    # except:
    #     flash("Ошибка!", 'error')
    #     timesheets = Timesheet.query.join(Course, Timesheet.course_id == Course.id)\
    #                                 .filter(Course.start_date < tdate)\
    #                                 .filter(Course.end_date > tdate)\
    #                                 .order_by(Timesheet.dow).order_by(Timesheet.hod)\
    #                                 .order_by(Timesheet.moh).all()
    # courses = Course.query.filter(Course.teacher_id == g.user.teacher.id).all()
    # teachers = Teacher.query.all()
    # places = Place.query.all()
    # return render_template("timesheet.html",
    #                        title="Расписание",
    #                        timesheets=timesheets,
    #                        courses=courses,
    #                        teachers=teachers,
    #                        places=places,
    #                        user=g.user)

@app.route('/disciplines', methods=['GET', 'POST'])
@login_required
def show_disciplines():
    """
        View of list of disciplines
    """
    if not g.user.is_admin:
        abort(404)
    try:
        if request.method == "POST":
            if 'modal_id' in request.form:
                if request.form['modal_id'] == '':
                    if request.form['modal_title'] != '':
                        discipline = Discipline(request.form['modal_title'])
                        db.session.add(discipline)
                        db.session.commit()
                        flash("Успешно добавлено!")
                    else:
                        flash("Ошибка: Поле названия пустое!", 'error')
                else:
                    if request.form['modal_title'] != '':
                        discipline = Discipline.query.get(request.form['modal_id'])
                        discipline.title = request.form['modal_title']
                        db.session.commit()
                        flash("Успешно изменено!")
                    else:
                        flash("Ошибка: Поле названия пустое!", 'error')
                disciplines = Discipline.query.all()
            else:
                disciplines = Discipline.query.filter(Discipline.title.ilike('%'+request.form['title']+'%')).all()
        else:
            disciplines = Discipline.query.all()
    except:
        flash("Ошибка!", 'error')
        disciplines = Discipline.query.all()
    return render_template("disciplines.html",
                           title="Предметы",
                           disciplines=disciplines,
                           user=g.user)

@app.route('/delete_discipline', methods=['POST'])
@login_required
def delete_discipline():
    """
        delete discipline
    """
    if not g.user.is_admin:
        return jsonify(res=0)
    discipline = Discipline.query.get(request.form['id'])
    if discipline:
        for course in discipline.courses:
            aux_delete_course(course.id)
        db.session.delete(discipline)
        db.session.commit()
        return jsonify(res=1)
    else:
        return jsonify(res=0)

@app.route('/courses/', methods=['GET', 'POST'])
@login_required
def show_courses():
    """
        View of list of courses
    """
    if not g.user.is_admin:
        abort(404)
    try:
        if request.method == "POST":
            if 'modal_id' in request.form:
                if request.form['modal_id'] == '':
                    if request.form['modal_title'] != '':
                        try:
                            cost = int(request.form['modal_cost'])
                        except:
                            cost = 0
                            flash("Ошибка: Поле 'Плата преподавалею' содержит не правильно значение!", 'error')
                        try:
                            student_cost = int(request.form['modal_student_cost'])
                        except:
                            student_cost = 0
                            flash("Ошибка: Поле 'Стоимость для учеников' содержит не правильно значение!", 'error')
                        start_date = datetime.strptime(request.form['modal_start_date'], '%d.%m.%Y')
                        end_date = datetime.strptime(request.form['modal_end_date'], '%d.%m.%Y')
                        course = Course(request.form['modal_title'],
                                        request.form['modal_discipline_id'],
                                        request.form['modal_teacher_id'],
                                        cost,
                                        student_cost,
                                        start_date,
                                        end_date)
                        db.session.add(course)
                        db.session.commit()
                        flash("Успешно добавлено!")
                        return redirect(url_for('show_course', course_id=course.id))
                    else:
                        flash("Ошибка: Поле названия пустое!", 'error')
                else:
                    if request.form['modal_title'] != '':
                        course = Course.query.get(request.form['modal_id'])
                        course.title = request.form['modal_title']
                        course.discipline_id = request.form['modal_discipline_id']
                        course.teacher_id = request.form['modal_teacher_id']
                        try:
                            course.cost = int(request.form['modal_cost'])
                        except:
                            flash("Ошибка: Поле 'Плата преподавателю' содержит неправильное значение!", 'error')
                        try:
                            course.student_cost = int(request.form['modal_student_cost'])
                        except:
                            flash("Ошибка: Поле 'Стоимость для учеников' содержит не правильно значение!", 'error')
                        course.start_date = datetime.strptime(request.form['modal_start_date'], '%d.%m.%Y')
                        course.end_date = datetime.strptime(request.form['modal_end_date'], '%d.%m.%Y')
                        db.session.commit()
                        flash("Успешно изменено!")
                    else:
                        flash("Ошибка: Поле названия пустое!", 'error')
                courses = Course.query.all()
            else:
                courses = Course.query.filter(Course.title.ilike('%'+request.form['title']+'%')).all()   
                if request.form['teacher_id']:
                    courses = Course.query.filter(Course.teacher_id == request.form['teacher_id'])\
                                          .filter(Course.title.ilike('%'+request.form['title']+'%')).all()
                if request.form['discipline_id']:
                    courses = Course.query.filter(Course.discipline_id == request.form['discipline_id'])\
                                          .filter(Course.title.ilike('%'+request.form['title']+'%')).all()                                                                           
        else:
            courses = Course.query.all()
    except:
        flash("Ошибка!", 'error')
        courses = Course.query.all()
    disciplines = Discipline.query.all()
    teachers = Teacher.query.all()
    return render_template("courses.html",
                           title="Курсы",
                           courses=courses,
                           disciplines=disciplines,
                           teachers=teachers,
                           user=g.user)

def aux_delete_course(course_id):
    course = Course.query.get(course_id)
    if course:
        try:
            for time in course.times:
                db.session.delete(time)
            for student in course.students:
                db.session.delete(student)
            for lesson in course.lessons:
                aux_delete_lesson(lesson.id)
            db.session.delete(course)
            db.session.commit()
            return True
        except:
            pass
    return False

@app.route('/delete_course', methods=['POST'])
@login_required
def delete_course():
    """
        delete course
    """
    if not g.user.is_admin:
        return jsonify(res=0), 403
    course_id = request.form['id']
    if aux_delete_course(course_id):
        return jsonify(res=1)
    else:
        return jsonify(res=0)

@app.route('/studentnew/<student_id>', methods=['GET', 'POST'])
@login_required
def show_student_new(student_id):
    if not g.user.is_admin:
        abort(403)
    student = Student.query.get(student_id)
    if not student:
        abort(404)
    return render_template("student_new.html",
                           title=student.fio,
                           student=student,
                           user=g.user)


@app.route('/student/<student_id>', methods=['GET', 'POST'])
@login_required
def show_student(student_id):
    if not g.user.is_admin:
        abort(403)
    lessons = None
    student = Student.query.get(student_id)
    if not student:
        abort(404)
    if request.method == "POST":
        if 'modal_id' in request.form:
            if request.form['modal_id'] == '':
                course = Student_course_cost.query.filter(Student_course_cost.student_id == student_id)\
                            .filter(Student_course_cost.course_id == request.form['modal_course_id']).first()
                if course:
                    flash("Такой курс уже добавлен!")
                else:
                    try:
                        cost = int(request.form['modal_cost'])
                    except:
                        cost = 0
                        flash("Ошибка: Поле стоимости содержит не правильно значение!", 'error')
                    course = Student_course_cost(request.form['modal_course_id'],
                                                 student_id,
                                                 cost)
                    db.session.add(course)
                    db.session.commit()
                    flash("Успешно добавлено!")
            else:
                course = Student_course_cost.query.get(request.form['modal_id'])
                try:
                    course.cost = int(request.form['modal_cost'])
                    db.session.commit()
                    flash("Успешно изменено!")
                except:
                    flash("Ошибка: Поле стоимости содержит не правильно значение!", 'error')
            courses = Course.query.all()
        elif 'search_course_id' in request.form:
            start_date = datetime.strptime(request.form['modal_start_date'], '%d.%m.%Y')
            end_date = datetime.strptime(request.form['modal_end_date'], '%d.%m.%Y')
            if request.form['search_course_id'] == '':
                lessons = Presence.query.join(Lesson, Lesson.id == Presence.lesson_id)\
                                        .filter(Presence.student_id == student_id)\
                                        .filter(Lesson.date.between(start_date, end_date))\
                                        .order_by(desc(Lesson.date)).all()
            else:
                lessons = Presence.query.join(Lesson, Lesson.id == Presence.lesson_id)\
                                        .filter(Presence.student_id == student_id)\
                                        .filter(Lesson.course_id == request.form['search_course_id'])\
                                        .filter(Lesson.date.between(start_date, end_date))\
                                        .order_by(desc(Lesson.date)).all()
        elif 'payment_id' in request.form and request.form['payment_id']:
            payment = Payment.query.get(request.form['payment_id'])
            if payment:
                if request.form['modal_payments_cost'] != '':
                    payment.amount = int(request.form['modal_payments_cost'])
                else:     
                    payment.amount = 0
                if request.form['modal_payments_cost_extra'] != '':
                    payment.amount_extra = int(request.form['modal_payments_cost_extra'])
                else:     
                    payment.amount_extra = 0 
                payment.comment_extra = request.form['modal_payments_cost_extra_comment']
                payment.course_id = request.form['modal_payments_course_id']
                db.session.commit()
                flash("Оплата изменена!")
            else:
                flash("Ошибка!", "error")
        elif 'modal_payments_course_id' in request.form:
            # payment
            if (request.form['modal_payments_cost'] != '') and (request.form['modal_payments_cost_extra'] != ''):
                now_date = datetime.now()
                payment = Payment(student.id,
                              request.form['modal_payments_course_id'],
                              int(request.form['modal_payments_cost']),
                              int(request.form['modal_payments_cost_extra']),
                              request.form['modal_payments_cost_extra_comment'],
                              now_date)
            elif (request.form['modal_payments_cost'] != '') and (request.form['modal_payments_cost_extra'] == ''):
                now_date = datetime.now()
                payment = Payment(student.id,
                              request.form['modal_payments_course_id'],
                              int(request.form['modal_payments_cost']),
                              0,
                              request.form['modal_payments_cost_extra_comment'],
                              now_date)   
            elif (request.form['modal_payments_cost'] == '') and (request.form['modal_payments_cost_extra'] != ''):
                now_date = datetime.now()
                payment = Payment(student.id,
                              request.form['modal_payments_course_id'],
                              0,
                              int(request.form['modal_payments_cost_extra']),
                              request.form['modal_payments_cost_extra_comment'],
                              now_date) 
            elif (request.form['modal_payments_cost'] == '' and request.form['modal_payments_cost_extra'] == ''):
                flash("Вы не внесли сумму!")                              
            db.session.add(payment)
            db.session.commit()
            flash("Оплата занесена в систему!")
    if lessons == None:
        start_date = datetime.now() - timedelta(days=30)
        end_date = datetime.now()
        lessons = Presence.query.join(Lesson, Lesson.id == Presence.lesson_id)\
                                .filter(Presence.student_id == student_id)\
                                .filter(Lesson.date.between(start_date, end_date))\
                                .order_by(desc(Lesson.date)).all()
    disciplines = Discipline.query.all()
    teachers = Teacher.query.all()
    courses = Student_course_cost.query.filter(Student_course_cost.student_id == student_id).all()
    # all_courses = Course.query.join(Student_course_cost).filter(Student_course_cost.student_id == student_id).all()
    all_courses = Course.query.filter(~Course.id.in_([row.course_id for row in Student_course_cost.query.filter(Student_course_cost.student_id == student_id).all()])).all()

    return render_template("student.html",
                           title=student.fio,
                           student=student,
                           courses=courses,
                           all_courses=all_courses,
                           disciplines=disciplines,
                           teachers=teachers,
                           lessons=lessons,
                           user=g.user,
                           start_date=start_date,
                           end_date=end_date)

@app.route('/delete_student_course_cost', methods=['POST'])
@login_required
def delete_student_course_cost():
    """
        delete course
    """
    if not g.user.is_admin:
        return jsonify(res=0), 403
    course = Student_course_cost.query.get(request.form['id'])
    if course:
        presences = Presence.query.join(Lesson, Lesson.id == Presence.lesson_id)\
                                  .filter(Lesson.course_id == course.course_id)\
                                  .filter(Presence.student_id == course.student_id).all()
        for presence in presences:
            db.session.delete(presence)
        db.session.delete(course)
        db.session.commit()
        return jsonify(res=1)
    else:
        return jsonify(res=0)

def aux_delete_timesheet(timesheet_id):
    timesheet = Timesheet.query.get(timesheet_id)
    if timesheet:
        try:
            for lesson in timesheet.lessons:
                aux_delete_lesson(lesson.id)
            db.session.delete(timesheet)
            db.session.commit()
            return True
        except:
            pass
    return False

@app.route('/delete_timesheet', methods=['POST'])
@login_required
def delete_timesheet():
    """
        delete timesheet
    """
    if not g.user.is_admin:
        return jsonify(res=0), 403
    timesheet_id = request.form['id']
    if aux_delete_timesheet(timesheet_id):
        return jsonify(res=1)
    else:
        return jsonify(res=0)
 

def form_lessons(course_id):
    course = Course.query.get(course_id)
    if course:
        timesheets = Timesheet.query.filter(Timesheet.course_id == course_id).all()
        week = course.start_date
        wn = course.start_date.weekday()
        while week < course.end_date:
            for time in timesheets:
                date = week
                date += timedelta(days=time.dow - wn)
                date += timedelta(hours=time.hod)
                date += timedelta(minutes=time.moh)
                lesson = Lesson.query.filter(Lesson.course_id == course_id)\
                                     .filter(Lesson.date == date).first()
                if not lesson:
                    lesson = Lesson(course_id, time.id, date)
                    db.session.add(lesson)
            week += timedelta(weeks=1)
        db.session.commit()
        return True
    else:
        return False

def reform_lessons(course_id):
    lessons = Lesson.query.filter(Lesson.course_id == course_id).all()
    for lesson in lessons:
        if lesson.status == 0:
            db.session.delete(lesson)
    db.session.commit()
    return form_lessons(course_id)

@app.route('/course2/<course_id>', methods=['GET', 'POST'])
@login_required
def show_course2(course_id):
    if not g.user.is_admin and not g.user.teacher:
        abort(404)
    course = Course.query.get(course_id)
    if not course:
        abort(404)
    elif g.user.teacher and g.user.teacher.id != course.teacher_id:
        abort(403)
    try:
    # if True:
        if request.method == "POST":
            if 'modal_id' in request.form:
                if request.form['modal_id'] == '':
                    course = Student_course_cost.query.filter(Student_course_cost.student_id == request.form['modal_student_id'])\
                                .filter(Student_course_cost.course_id == course_id).first()
                    if course:
                        flash("Такой ученик уже есть в системе!")
                    else:
                        try:
                            cost = int(request.form['modal_cost'])
                            comment = request.form['modal_cost_comment']
                        except:
                            cost = 0
                            flash("Ошибка: Поле стоимости содержит неправильное значение!", 'error')
                        course = Student_course_cost(course_id,
                                                     request.form['modal_student_id'],
                                                     cost,
                                                     comment)
                        db.session.add(course)
                        db.session.commit()
                        flash("Успешно добавлен!")
                else:
                    course = Student_course_cost.query.get(request.form['modal_id'])
                    try:
                        course.comment = request.form['modal_cost_comment']
                        course.cost = int(request.form['modal_cost'])
                        db.session.commit()
                        flash("Успешно изменен!")
                    except:
                        flash("Ошибка: Поле стоимости содержит неправильное значение!", 'error')
            elif 'modal_timesheet_id' in request.form:
                dow = int(request.form['modal_dow'])
                hod = int(request.form['modal_hod']) % 24
                moh = int(request.form['modal_moh']) % 60
                hoe = int(request.form['modal_hoe']) % 24
                moe = int(request.form['modal_moe']) % 60
                if request.form['modal_timesheet_id'] == '':
                    course = Course.query.get(course_id)
                    timesheet = Timesheet.query.join(Course, Timesheet.course_id == Course.id)\
                                                .filter(Course.teacher_id == course.teacher_id)\
                                                .filter(Timesheet.dow == dow)\
                                                .filter(Timesheet.hod == hod).first()
                    if timesheet:
                        flash("В это время у преподавателя уже стоит занятие!")
                    else:
                        timesheet = Timesheet.query.filter(Timesheet.place_id == request.form['modal_place'])\
                                                    .filter(Timesheet.dow == dow)\
                                                    .filter(Timesheet.hod == hod).first()
                        if timesheet:
                            flash("В это время в этой аудитории уже стоит занятие!")
                        else:
                            timesheet = Timesheet(course_id,
                                                  request.form['modal_place'],
                                                  dow,
                                                  hod,
                                                  moh,
                                                  hoe,
                                                  moe)
                            db.session.add(timesheet)
                            db.session.commit()
                            reform_lessons(course_id)
                            flash("Успешно добавлен!")
                else:
                    course = Course.query.get(course_id)
                    timesheet = Timesheet.query.join(Course, Timesheet.course_id == Course.id)\
                                                .filter(Timesheet.id != request.form['modal_timesheet_id'])\
                                                .filter(Course.teacher_id == course.teacher_id)\
                                                .filter(Timesheet.dow == dow)\
                                                .filter(Timesheet.hod == hod).first()
                    if timesheet:
                        flash("В это время у преподавателя уже стоит занятие!")
                    else:
                        timesheet = Timesheet.query.filter(Timesheet.place_id == request.form['modal_place'])\
                                                   .filter(Timesheet.id != request.form['modal_timesheet_id'])\
                                                   .filter(Timesheet.dow == dow)\
                                                   .filter(Timesheet.hod == hod).first()
                        if timesheet:
                            flash("В это время в этой аудитории уже стоит занятие!")
                        else:
                            timesheet = Timesheet.query.get(request.form['modal_timesheet_id'])
                            timesheet.place_id = request.form['modal_place']
                            timesheet.dow = dow
                            timesheet.hod = hod
                            timesheet.moh = moh
                            timesheet.hoe = hoe
                            timesheet.moe = moe
                            db.session.commit()
                            flash("Расписание успешно изменено")
            elif 'modal_lesson_id' in request.form:
                # homework
                homework_id = request.form['homework_id']
                title = request.form['modal_title']
                lesson_id = request.form['modal_lesson_id']
                homework = Homework.query.get(homework_id)
                if homework:
                    student_ids = request.form.getlist('student_ids')
                    for student_id in student_ids:
                        task = Task(homework_id, lesson_id, student_id, title)
                        for arg in homework.args.all():
                            targ = Taskarg(arg.id, request.form.get(str(arg.title), ''))
                            task.args.append(targ)
                        db.session.add(task)
                    db.session.commit()
                    flash('ДЗ задано!')
                else:
                    flash("Ошибка редактирования", 'error')
            elif 'modal_text' in request.form:
                # adds text
                lesson = Lesson.query.get(request.form['modal_abstract_lesson_id'])
                if lesson:
                    lesson.title = request.form['modal_title']
                    lesson.text = request.form['modal_text']
                    db.session.commit()
                    flash("Конспект сохранен!")
                else:
                    flash("Занятие не найдено!", 'error')
    except:
        flash("Ошибка!", 'error')
    lessons = Lesson.query.filter(Lesson.course_id == course_id).order_by(Lesson.date).all()
    if not lessons:
        form_lessons(course_id)
        lessons = Lesson.query.filter(Lesson.course_id == course_id).order_by(Lesson.date).all()
        #return redirect(url_for('show_course', course_id=course_id))
    timesheets = Timesheet.query.filter(Timesheet.course_id == course_id).order_by(Timesheet.dow, Timesheet.hod).all()
    course = Course.query.get(course_id)
    if not course:
        abort(404)
    disciplines = Discipline.query.all()
    teachers = Teacher.query.all()
    students = Student_course_cost.query.filter(Student_course_cost.course_id == course_id).all()
    all_students = Student.query.filter(Student.id.notin_([row.student_id for row in students])).all()
    homeworks = Homework.query.all()
    places = Place.query.all()
    return render_template("course.html",
                           all_students=all_students,
                           course=course,
                           disciplines=disciplines,
                           homeworks=homeworks,
                           lessons=lessons,
                           teachers=teachers,
                           title=course.title,
                           timesheets=timesheets,
                           students=students,
                           places=places,
                           user=g.user)

@app.route('/cancel_lesson', methods=['POST'])
@login_required
def cancel_lesson():
    """
        delete timesheet
    """
    if not g.user.is_admin and not g.user.teacher:
        return jsonify(res=0), 403
    lesson = Lesson.query.get(request.form['id'])
    if lesson:
        lesson.status = -1
        db.session.commit()
        return jsonify(res=1)
    else:
        return jsonify(res=0)




def aux_delete_lesson(lesson_id):
    lesson = Lesson.query.get(lesson_id)
    if lesson:
        try:
            for presence in lesson.students:
                db.session.delete(presence)
            for task in lesson.tasks:
                for arg in task.args:
                    db.session.delete(arg)
                db.session.delete(task)
            db.session.delete(lesson)
            db.session.commit()
            return True
        except:
            pass
    return False

@app.route('/delete_lesson', methods=['POST'])
@login_required
def delete_lesson():
    """
        delete timesheet
    """
    if not g.user.is_admin:
        return jsonify(res=0), 403
    lesson_id = request.form['lesson_id']
    if aux_delete_lesson(lesson_id):
        return jsonify(res=1)
    else:
        return jsonify(res=0)    

@app.route('/check_presence', methods=['POST'])
@login_required
def check_presence():
    """
        delete timesheet
    """
    if not g.user.is_admin and not g.user.teacher:
        return jsonify(res=0), 403
    pres = Presence.query.filter(Presence.student_id == request.form['student_id'])\
                         .filter(Presence.lesson_id == request.form['lesson_id']).first()
    if pres:
        pres.status = request.form['status']
        db.session.commit()
        return jsonify(res=1)
    else:
        pres = Presence(request.form['student_id'], request.form['lesson_id'], request.form['status'])
        db.session.add(pres)
        db.session.commit()
        return jsonify(res=1)
    return jsonify(res=0)

@app.route('/start_lesson', methods=['POST'])
@login_required
def start_lesson():
    """
        delete timesheet
    """
    if not g.user.is_admin and not g.user.teacher:
        return jsonify(res=0), 403
    lesson = Lesson.query.get(request.form['id'])
    if lesson:
        lesson.status = 1
        db.session.commit()
        return jsonify(res=1)
    else:
        return jsonify(res=0)

@app.route('/lesson/<lesson_id>', methods=['GET', 'POST'])
@login_required
def show_lesson(lesson_id):
    if not g.user.is_admin and not g.user.teacher:
        abort(404)
    lesson = Lesson.query.get(lesson_id)
    if lesson:
        if g.user.teacher and lesson.course.teacher_id != g.user.teacher.id:
            abort(403)
        else:
            lesson.status = 1
            db.session.commit()
    else:
        abort(404)

    if request.method == "POST":
        if 'modal_task_id' in request.form:
            # answer
            task = Task.query.get(request.form['modal_task_id'])
            if task:
                task.teacher_answer = request.form['modal_teacher_answer']
                db.session.commit()
                flash("Ответ успешно отправлен!")
            else:
                flash("Ошибка редактирования", 'error')
        elif 'modal_id' in request.form:
            if request.form['modal_id']:
                # edit
                task = Task.query.get(request.form['modal_id'])
                if task:
                    task.title = request.form['modal_title']
                    for arg in task.args.all():
                        arg.value = request.form.get(arg.arg.title, '')
                    db.session.commit()
                    flash("Редактирование успешно завершено!")
                else:
                    flash("Ошибка редактирования", 'error')
            else:
                # add
                homework_id = request.form['homework_id']
                title = request.form['modal_title']
                homework = Homework.query.get(homework_id)
                if homework:
                    student_ids = request.form.getlist('student_ids')
                    for student_id in student_ids:
                        task = Task(homework_id, lesson_id, student_id, title)
                        for arg in homework.args.all():
                            targ = Taskarg(arg.id, request.form.get(str(arg.title), ''))
                            task.args.append(targ)
                        db.session.add(task)
                    db.session.commit()
                    flash("Домашнее задание успешно задано!")
                else:
                    flash("Ошибка редактирования", 'error')
        elif 'modal_text' in request.form:
            # adds text
            lesson.title = request.form['modal_title']
            lesson.text = request.form['modal_text']
            db.session.commit()
            flash("Конспект сохранен!")
        # elif 'payment_id' in request.form and request.form['payment_id']:
        #     payment = Payment.query.get(request.form['student_id'])
        #     if payment:
        #         if request.form['modal_cost'] != '':
        #             payment.amount = int(request.form['modal_cost'])
        #         else:     
        #             payment.amount = 0
        #         if request.form['modal_cost_extra'] != '':
        #             payment.amount_extra = int(request.form['modal_cost_extra'])
        #         else:     
        #             payment.amount_extra = 0 
        #         payment.comment_extra = request.form['modal_cost_extra_comment']
        #         db.session.commit()
        #         flash("Оплата изменена!")
        #     else:
        #         flash("Ошибка!", "error")
        elif 'modal_cost' in request.form:
            # payment = Payment.query.get(request.form['student_id'])
            student_id = request.form['student_id']
            if request.form['modal_cost'] != '':
                cost = int(request.form['modal_cost'])
            else: 
                cost = 0
            if request.form['modal_cost_extra'] != '':
                cost_extra = int(request.form['modal_cost_extra'])
            else: 
                cost_extra = 0        
            cost_extra_comment = request.form['modal_cost_extra_comment']
            now_date = datetime.now()
            payment = Payment(student_id, lesson.course.id, cost, cost_extra, cost_extra_comment, now_date)
            db.session.add(payment)
            db.session.commit()
            flash("Оплата занесена в систему!")   
    students = Student_course_cost.query.filter(Student_course_cost.course_id == lesson.course_id).all()
    stud_stat = Presence.query.filter(Presence.lesson_id == lesson_id).all()
    stud = []
    for student in students:
        fl = 0
        for st in stud_stat:
            if student.student.id == st.student_id:
                stud.append({'student': student, 'status': st.status})
                fl = 1
                continue
        if fl == 0:
            stud.append({'student': student, 'status': 0})
    homeworks = Homework.query.all()
    return render_template("lesson.html",
                           title="Занятие",
                           lesson=lesson,
                           students=stud,
                           homeworks=homeworks,
                           user=g.user)

@app.route('/places', methods=['GET', 'POST'])
def show_places():
    try:
    # if True:
        if g.user and g.user.is_authenticated and g.user.is_admin and request.method == "POST":
            if 'modal_place_title' in request.form:
                if request.form['modal_place_id']:
                    place = Place.query.get(request.form['modal_place_id'])
                    place.title = request.form['modal_place_title']
                    db.session.commit()
                else:
                    place = Place(request.form['modal_place_title'])
                    db.session.add(place)
                    db.session.commit()
    except:
        flash("Ошибка!", 'error')
    places = Place.query.all()
    return render_template("places.html",
                           title="Центры",
                           places=places,
                           user=g.user)

@app.route('/timesheet', methods=['GET', 'POST'])
def show_timesheet():
    tdate = datetime.now().strftime('%Y-%m-%d')
    try:
    # if True:
        if g.user and g.user.is_authenticated and g.user.is_admin and request.method == "POST":
            if 'modal_timesheet_id' in request.form and g.user and g.user.is_authenticated and g.user.is_admin:
                dow = int(request.form['modal_dow'])
                hod = int(request.form['modal_hod']) % 24
                moh = int(request.form['modal_moh']) % 60
                hoe = int(request.form['modal_hoe']) % 24
                moe = int(request.form['modal_moe']) % 60
                if request.form['modal_timesheet_id'] == '':
                    course = Course.query.get(request.form['modal_course_id'])
                    timesheet = Timesheet.query.join(Course, Timesheet.course_id == Course.id)\
                                                .filter(Course.teacher_id == course.teacher_id)\
                                                .filter(Timesheet.dow == dow)\
                                                .filter(Timesheet.hod == hod).first()
                    if timesheet:
                        flash("В это время у преподавателя уже стоит занятие!")
                    else:
                        timesheet = Timesheet.query.filter(Timesheet.place_id == request.form['modal_place'])\
                                                    .filter(Timesheet.dow == dow)\
                                                    .filter(Timesheet.hod == hod).first()
                        if timesheet:
                            flash("В это время в этой аудитории уже стоит занятие!")
                        else:
                            timesheet = Timesheet(request.form['modal_course_id'],
                                                  request.form['modal_place'],
                                                  dow,
                                                  hod,
                                                  moh,
                                                  hoe,
                                                  moe)
                            db.session.add(timesheet)
                            db.session.commit()
                            flash("Успешно добавлен!")
                else:
                    # edit
                    course = Course.query.get(request.form['modal_course_id'])
                    timesheet = Timesheet.query.join(Course, Timesheet.course_id == Course.id)\
                                                .filter(Timesheet.id != request.form['modal_timesheet_id'])\
                                                .filter(Course.teacher_id == course.teacher_id)\
                                                .filter(Timesheet.dow == dow)\
                                                .filter(Timesheet.hod == hod).first()
                    if timesheet:
                        flash("В это время у преподавателя уже стоит занятие!")
                    else:
                        timesheet = Timesheet.query.filter(Timesheet.place_id == request.form['modal_place'])\
                                                   .filter(Timesheet.id != request.form['modal_timesheet_id'])\
                                                   .filter(Timesheet.dow == dow)\
                                                   .filter(Timesheet.hod == hod).first()
                        if timesheet:
                            flash("В это время в этой аудитории уже стоит занятие!")
                        else:
                            timesheet = Timesheet.query.get(request.form['modal_timesheet_id'])
                            timesheet.course_id = request.form['modal_course_id']
                            timesheet.place_id = request.form['modal_place']
                            timesheet.dow = dow
                            timesheet.hod = hod
                            timesheet.moh = moh
                            timesheet.hod = hoe
                            timesheet.moh = moe
                            db.session.commit()
                            flash("Расписание успешно изменено")
                timesheets = Timesheet.query.join(Course, Timesheet.course_id == Course.id)\
                                            .filter(Course.start_date < tdate)\
                                            .filter(Course.end_date > tdate)\
                                            .order_by(Timesheet.dow).order_by(Timesheet.hod)\
                                            .order_by(Timesheet.moh).all()
            elif 'course_id' in request.form:
                timesheets = Timesheet.query.join(Course, Timesheet.course_id == Course.id)\
                                        .filter(Course.start_date < tdate)\
                                        .filter(Course.end_date > tdate)
                if request.form['course_id']:
                    timesheets = timesheets.filter(Course.id == request.form['course_id'])
                if request.form['teacher_id']:
                    timesheets = timesheets.filter(Course.teacher_id == request.form['teacher_id'])
                if request.form['dow']:
                    timesheets = timesheets.filter(Timesheet.dow == request.form['dow'])
                if request.form['place']:
                    timesheets = timesheets.filter(Timesheet.place_id == request.form['place'])
                timesheets = timesheets.order_by(Timesheet.dow).order_by(Timesheet.hod)\
                                       .order_by(Timesheet.moh).all()
            else:
                timesheets = Timesheet.query.join(Course, Timesheet.course_id == Course.id)\
                                            .filter(Course.start_date < tdate)\
                                            .filter(Course.end_date > tdate)\
                                            .order_by(Timesheet.dow).order_by(Timesheet.hod)\
                                            .order_by(Timesheet.moh).all()
        else:
            timesheets = Timesheet.query.join(Course, Timesheet.course_id == Course.id)\
                                        .filter(Course.start_date < tdate)\
                                        .filter(Course.end_date > tdate)\
                                        .order_by(Timesheet.dow).order_by(Timesheet.hod)\
                                        .order_by(Timesheet.moh).all()
    except:
        flash("Ошибка!", 'error')
        timesheets = Timesheet.query.join(Course, Timesheet.course_id == Course.id)\
                                    .filter(Course.start_date < tdate)\
                                    .filter(Course.end_date > tdate)\
                                    .order_by(Timesheet.dow).order_by(Timesheet.hod)\
                                    .order_by(Timesheet.moh).all()
    courses = Course.query.all()
    teachers = Teacher.query.all()
    return render_template("timesheet.html",
                           title="Расписание",
                           timesheets=timesheets,
                           courses=courses,
                           teachers=teachers,
                           user=g.user)

@app.route('/teachers/payments', methods=['GET', 'POST'])
@login_required
def show_teacher_payments():
    if not g.user.is_admin:
        abort(404)
    summ_done = 0
    summ_all = 0
    try:
        if request.method == "POST":
            if 'teacher_id' in request.form:
                start_date = datetime.strptime(request.form['modal_start_date'], '%d.%m.%Y')
                end_date = datetime.strptime(request.form['modal_end_date'], '%d.%m.%Y')
                if request.form['teacher_id'] == '0' and request.form['discipline_id'] == '0':
                    courses = Course.query.all()
                elif request.form['teacher_id'] == '0':
                    courses = Course.query.filter(Course.discipline_id == request.form['discipline_id']).all()
                elif request.form['discipline_id'] == '0':
                    courses = Course.query.filter(Course.teacher_id == request.form['teacher_id']).all()
                else:
                    courses = Course.query.filter(Course.teacher_id == request.form['teacher_id'])\
                                          .filter(Course.discipline_id == request.form['discipline_id']).all()
                result = []
                for course in courses:
                    done = Lesson.query.filter(Lesson.course_id == course.id)\
                                          .filter(Lesson.date.between(start_date, end_date))\
                                          .filter(Lesson.status == 1).all()
                    not_done = Lesson.query.filter(Lesson.course_id == course.id)\
                                          .filter(Lesson.date.between(start_date, end_date))\
                                          .filter(Lesson.status == 0).all()
                    result.append({'course': course, 'done': len(done), 'not_done': len(not_done)})
                    summ_done += len(done) * course.cost
                    summ_all += (len(done) + len(not_done)) * course.cost

        else:
            result = None
    except:
        flash('Ошибка!', 'error')
        result = None
    teachers = Teacher.query.all()
    disciplines = Discipline.query.all()
    return render_template("teachers_payments.html",
                           title="Отчеты: Плата преподавателям",
                           teachers=teachers,
                           disciplines=disciplines,
                           result=result,
                           user=g.user,
                           sdate=(datetime.now() - timedelta(days=15)).strftime('%d.%m.%Y'),
                           edate=(datetime.now() + timedelta(days=15)).strftime('%d.%m.%Y'),
                           summ_done=summ_done,
                           summ_all=summ_all)

@app.route('/students/payments', methods=['GET', 'POST'])
@login_required
def show_student_payments():
    if not g.user.is_admin:
        abort(404)
    summ_all = 0
    summ_done = 0
    try:
    # if True:
        if request.method == "POST":
            if 'student_id' in request.form:
                start_date = datetime.strptime(request.form['modal_start_date'], '%d.%m.%Y')
                end_date = datetime.strptime(request.form['modal_end_date'], '%d.%m.%Y')
                if request.form['student_id'] == '0':
                    students = Student.query.all()
                else:
                    students = Student.query.filter(Student.id == request.form['student_id']).all()
                result = []
                for student in students:
                    # student = Student.query.get(request.form['student_id'])
                    if request.form['course_id'] != '0':
                        courses = Course.query.filter(Course.id == request.form['course_id'])
                    elif request.form['discipline_id'] == '0':
                        courses = Course.query.join(Student_course_cost, Student_course_cost.course_id == Course.id)\
                                              .filter(Student_course_cost.student_id == student.id).all()
                    else:
                        courses = Course.query.join(Student_course_cost, Student_course_cost.course_id == Course.id)\
                                              .filter(Student_course_cost.student_id == student.id)\
                                              .filter(Course.discipline_id == request.form['discipline_id']).all()
                    for course in courses:
                        student_in_course = Student_course_cost.query.filter(Student_course_cost.student_id == student.id)\
                                                        .filter(Student_course_cost.course_id == course.id).first()
                        if student_in_course:
                            cost = student_in_course.cost
                        else:
                            continue
                        alll = Lesson.query.filter(Lesson.course_id == course.id)\
                                           .filter(Lesson.date.between(start_date, end_date))\
                                           .filter(Lesson.status != 2).all()
                        pres = Lesson.query.join(Presence, Presence.lesson_id == Lesson.id)\
                                              .filter(Lesson.course_id == course.id)\
                                              .filter(Presence.student_id == student.id)\
                                              .filter(Lesson.date.between(start_date, end_date))\
                                              .filter(Presence.status == 1).all()
                        not_pres = Lesson.query.join(Presence, Presence.lesson_id == Lesson.id)\
                                              .filter(Lesson.course_id == course.id)\
                                              .filter(Presence.student_id == student.id)\
                                              .filter(Lesson.date.between(start_date, end_date))\
                                              .filter(Presence.status == -1).all()
                        not_pres_2 = Lesson.query.join(Presence, Presence.lesson_id == Lesson.id)\
                                              .filter(Lesson.course_id == course.id)\
                                              .filter(Presence.student_id == student.id)\
                                              .filter(Lesson.date.between(start_date, end_date))\
                                              .filter(Presence.status == 2).all()

                        payments = Payment.query.filter(Payment.student_id == student.id)\
                                                .filter(Payment.course_id == course.id)\
                                                .filter(Payment.date.between(start_date, end_date)).all()
                        this_month_payments = 0
                        for payment in payments:
                            this_month_payments += payment.amount
                        all_payments = 0
                        payments = Payment.query.filter(Payment.student_id == student.id)\
                                                .filter(Payment.course_id == course.id).all()
                        for payment in payments:
                            all_payments += payment.amount
                        prev_all_presence = Lesson.query.join(Presence, Presence.lesson_id == Lesson.id)\
                                                        .filter(Lesson.course_id == course.id)\
                                                        .filter(Presence.student_id == student.id)\
                                                        .filter(Lesson.date < start_date)\
                                                        .filter(Presence.status != 2).all()
                        prev_month_debt = len(prev_all_presence) * cost
                        prev_month_payments = all_payments - this_month_payments - prev_month_debt
                        all_presence = Lesson.query.join(Presence, Presence.lesson_id == Lesson.id)\
                                                   .filter(Lesson.course_id == course.id)\
                                                   .filter(Presence.student_id == student.id)\
                                                   .filter(Lesson.date < end_date)\
                                                   .filter(Presence.status != 2).all()
                        all_debt = len(all_presence) * cost
                        debt = all_payments - all_debt

                        result.append({'course': course,
                                       'alll': len(alll),
                                       'pres': len(pres),
                                       'uv': len(not_pres_2),
                                       'not_pres': len(not_pres),
                                       'student': student,
                                       'cost': cost,
                                       'this_month_payments': this_month_payments,
                                       'prev_month_payments': prev_month_payments,
                                       'debt': debt})
                        summ_all += cost * len(alll)
                        summ_done += cost * (len(pres) + len(not_pres))

        else:
            result = None
    except:
        flash('Ошибка!', 'error')
        result = None
    students = Student.query.all()
    disciplines = Discipline.query.all()
    courses = Course.query.all()
    return render_template("students_payments.html",
                           title="Отчеты: Платы учеников",
                           students=students,
                           disciplines=disciplines,
                           courses=courses,
                           result=result,
                           sdate=(datetime.now() - timedelta(days=30)).strftime('%d.%m.%Y'),
                           edate=(datetime.now()).strftime('%d.%m.%Y'),
                           summ_done=summ_done,
                           summ_all=summ_all,
                           user=g.user)

#################################################### teacher ################################

@app.route('/teacher/profile', methods=['GET', 'POST'])
@login_required
def show_teachers_profile():
    """
        Teacher's profile
    """
    if not g.user.teacher:
        abort(404)
    return render_template("teacher_profile.html",
                           title="Профиль преподавателя",
                           teacher=g.user.teacher,
                           user=g.user)

@app.route('/homeworks', methods=['GET', 'POST'])
@login_required
def show_homeworks():
    if not g.user.is_admin and not g.user.teacher:
        abort(404)
    if request.method == "POST":
        if request.form['modal_homework_id']:
            # edit
            homework = Homework.query.get(request.form['modal_homework_id'])
            homework.title = request.form['modal_title']
            homework.text = request.form['modal_text']
            new_args = list(set([row.strip(' ')
                                 for row in request.form['modal_args'].split(',')
                                 if row.strip(' ')]))
            for arg in homework.args:
                if arg in new_args:
                    del new_args[new_args.index(arg)]
                else:
                    db.session.delete(arg)
            for arg in new_args:
                arge = Homeworkarg(arg)
                homework.args.append(arge)
            db.session.commit()
        else:
            # add new
            homework = Homework(request.form['modal_title'], request.form['modal_text'])
            new_args = list(set([row.strip(' ')
                                 for row in request.form['modal_args'].split(',')
                                 if row.strip(' ')]))
            for arg in new_args:
                arge = Homeworkarg(arg)
                homework.args.append(arge)
            db.session.add(homework)
            db.session.commit()

    homeworks = Homework.query.all()
    return render_template("homeworks.html",
                           title="Заготовки ДЗ",
                           homeworks=homeworks,
                           user=g.user)

@app.route('/homework/', methods=['GET', 'POST'])
@login_required
def show_homework():
    homework_id = request.args.get('homework_id')
    if not homework_id:
        abort(404)
    homework = Homework.query.get(homework_id)
    text = homework.text % request.args
    return render_template("task.html",
                           title=homework.title,
                           text=text,
                           user=g.user)

@app.route('/delete_homework', methods=['POST'])
@login_required
def delete_homework():
    """
        delete timesheet
    """
    if not g.user.is_admin and not g.user.teacher:
        return jsonify(res=0), 403
    homework = Homework.query.get(request.form['id'])
    if homework:
        # delete args
        for arg in homework.args:
            db.session.delete(arg)
        # delete tasks
        # delete task args
        for task in homework.tasks:
            for arg in task.args:
                db.session.delete(arg)
            db.session.delete(task)
        db.session.delete(homework)
        db.session.commit()
        return jsonify(res=1)
    else:
        return jsonify(res=0)

@app.route('/delete_place', methods=['POST'])
@login_required
def delete_place():
    """
        delete timesheet
    """
    if not g.user.is_admin:
        return jsonify(res=0), 403
    place = Place.query.get(request.form['id'])
    if place:
        for time in place.times:
            aux_delete_timesheet(time.id)
        db.session.delete(place)
        db.session.commit()
        return jsonify(res=1)
    else:
        return jsonify(res=0)

@app.route('/delete_task', methods=['POST'])
@login_required
def delete_task():
    """
        delete task
    """
    if not g.user.is_admin and not g.user.teacher:
        return jsonify(res=0), 403
    task = Task.query.get(request.form['id'])
    if task:
        for arg in task.args:
            db.session.delete(arg)
        db.session.delete(task)
        db.session.commit()
        return jsonify(res=1)
    else:
        return jsonify(res=0)

@app.route('/get_homework', methods=['POST'])
@login_required
def get_homework():
    if not g.user.is_admin and not g.user.teacher:
        return jsonify(res=0), 403
    homework = Homework.query.get(request.form['homework_id'])
    if homework:
        args = dict([(row.id, row.title) for row in homework.args.all()])
        return jsonify(res=1, text=homework.text, args=args, title=homework.title)
    else:
        return jsonify(res=0)

@app.route('/get_lesson_text', methods=['POST'])
@login_required
def get_lesson_text():
    if not g.user.is_admin and not g.user.teacher:
        return jsonify(res=0), 403
    lesson = Lesson.query.get(request.form['lesson_id'])
    if lesson:
        return jsonify(res=1, text=lesson.text, title=lesson.title)
    else:
        return jsonify(res=0)

@app.route('/get_task', methods=['POST'])
@login_required
def get_task():
    if not g.user.is_admin and not g.user.teacher:
        return jsonify(res=0), 403
    task = Task.query.get(request.form['task_id'])
    if task:
        args = dict([(row.arg.title, row.value) for row in task.args.all()])
        return jsonify(res=1,
                       homework_id=task.homework_id,
                       student_id=task.student_id,
                       title=task.title,
                       student_answer=task.student_answer,
                       teacher_answer=task.teacher_answer,
                       args=args)
    else:
        return jsonify(res=0)

@app.route('/task/answer', methods=['POST'])
@login_required
def send_task_answer():
    if not g.user.student:
        return jsonify(res=0), 403
    task = Task.query.get(request.form['task_id'])
    if task and task.student_id == g.user.student.id:
        try:
            task.points = int(request.form['points'])
        except:
            task.points = task.student.avg_points
        task.student_answer = request.form['student_answer']
        task.duration = request.form['duration']
        task.status = 1
        if task.student.avg_points == 0:
            task.student.avg_points = task.points
        else:
            task.student.avg_points = (3 * task.student.avg_points + task.points) / 4
        db.session.commit()
        return jsonify(res=1)
    else:
        return jsonify(res=0)

####################################################################################################

@app.route('/student/profile', methods=['GET', 'POST'])
@login_required
def show_student_profile():
    # курсы
    # расписание
    # домашки
    # прогресс
    if not g.user.student:
        abort(404)    
    today = datetime.now()
    monday = today - timedelta(days=today.weekday())
    sunday = monday + timedelta(days=6)
    lessons = Lesson.query.join(Student_course_cost, Student_course_cost.course_id == Lesson.course_id)\
                          .filter(Lesson.date.between(monday.strftime('%Y-%m-%d'), sunday.strftime('%Y-%m-%d')))\
                          .filter(Student_course_cost.student_id == g.user.student.id)\
                          .order_by(Lesson.date).all()
    tasks = Task.query.filter(Task.student_id == g.user.student.id).order_by(-Task.id)[:10]
    return render_template("student_profile.html",
                           title='Student Profile',
                           lessons=lessons,
                           tasks=tasks,
                           user=g.user)

@app.route('/student/course/<int:course_id>', methods=['GET', 'POST'])
@login_required
def show_student_course(course_id):
    # конспект
    # домашки
    if not g.user.student:
        abort(403)
    course = Course.query.get(course_id)
    if not course:
        abort(404)
    is_students_course = Course.query.join(Student_course_cost, Student_course_cost.course_id == Course.id)\
                                     .filter(Student_course_cost.student_id == g.user.student.id)\
                                     .filter(Course.id == course_id).first()
    if not is_students_course:
        flash('Вы не записаны на данный курс!', 'error')
    return render_template("student_course.html",
                           title=course.title,
                           course=course,
                           is_students_course=is_students_course,
                           Presence=Presence,
                           user=g.user)

@app.route('/student/lesson/<int:lesson_id>', methods=['GET', 'POST'])
@login_required
def show_student_lesson(lesson_id):
    # конспект
    # домашки
    if not g.user.student:
        abort(403)
    lesson = Lesson.query.join(Student_course_cost, Student_course_cost.course_id == Lesson.course_id)\
                         .filter(Student_course_cost.student_id == g.user.student.id)\
                         .filter(Lesson.id == lesson_id).first()
    if not lesson:
        abort(404)
    return render_template("student_lesson.html",
                           title=lesson.course.title,
                           lesson=lesson,
                           user=g.user)
@app.route('/student/homeworks/<student_id>', methods=['GET', 'POST'])
@login_required
def show_student_tasks_teacher(student_id):
    if not g.user.student:
        # abort(403)
        student = Student.query.get(student_id)
        tasks = Task.query.filter(Task.student_id == student_id).order_by(-Task.id).all()
    else:    
        tasks = Task.query.filter(Task.student_id == g.user.student.id).order_by(-Task.id).all()
    homeworks = Homework.query.all()
    if request.method == "POST":
        if 'modal_task_id' in request.form:
            # answer
            task = Task.query.get(request.form['modal_task_id'])
            if task:
                task.teacher_answer = request.form['modal_teacher_answer']
                db.session.commit()
                flash("Ответ успешно отправлен!")
            else:
                flash("Ошибка редактирования", 'error')
        if 'modal_id' in request.form:
            if request.form['modal_id']:
                # edit
                task = Task.query.get(request.form['modal_id'])
                if task:
                    task.title = request.form['modal_title']
                    for arg in task.args.all():
                        arg.value = request.form.get(arg.arg.title, '')
                    db.session.commit()
                    flash("Редактирование успешно завершено!")
                else:
                    flash("Ошибка редактирования", 'error')        
       
    return render_template("student_tasks.html",
                           title="Домашнее задание",
                           student=student,
                           homeworks=homeworks,
                           tasks=tasks,
                           user=g.user)

@app.route('/student/homeworks', methods=['GET'])
@login_required
def show_student_tasks():
    if not g.user.student:
        abort(403)
    #     tasks = Task.query.filter(Task.student_id == student_id).order_by(-Task.id).all()
    # else:    
    tasks = Task.query.filter(Task.student_id == g.user.student.id).order_by(-Task.id).all()
    return render_template("student_tasks.html",
                           title="Домашнее задание",
                           tasks=tasks,
                           user=g.user)

@app.route('/student/homework/<int:task_id>', methods=['GET', 'POST'])
@login_required
def show_student_task(task_id):
    if not g.user.student:
        abort(403)
    task = Task.query.get(task_id)
    if not task:
        abort(404)
    args = dict([(arg.arg.title, arg.value) for arg in task.args.all()])
    text = task.homework.text % args
    return render_template("task.html",
                           title=task.title,
                           task_id=task_id,
                           text=text,
                           user=g.user)

@app.route('/student/payments', methods=['GET', 'POST'])
@login_required
def show_student_payment():
    if not g.user.student:
        abort(404)
    summ_all = 0
    summ_done = 0
    summ_debt = 0
    try:
    # if True:

        
        if request.method == "POST":
            start_date = datetime.strptime(request.form['modal_start_date'], '%d.%m.%Y')
            end_date = datetime.strptime(request.form['modal_end_date'], '%d.%m.%Y')
            result = []
            student = g.user.student
            courses = Course.query.join(Student_course_cost, Student_course_cost.course_id == Course.id)\
                                  .filter(Student_course_cost.student_id == student.id).all()
            for course in courses:
                student_in_course = Student_course_cost.query.filter(Student_course_cost.student_id == student.id)\
                                                .filter(Student_course_cost.course_id == course.id).first()
                if student_in_course:
                    cost = student_in_course.cost
                else:
                    continue
                alll = Lesson.query.filter(Lesson.course_id == course.id)\
                                   .filter(Lesson.date.between(start_date, end_date))\
                                   .filter(Lesson.status != 2).all()
                pres = Lesson.query.join(Presence, Presence.lesson_id == Lesson.id)\
                                      .filter(Lesson.course_id == course.id)\
                                      .filter(Presence.student_id == student.id)\
                                      .filter(Lesson.date.between(start_date, end_date))\
                                      .filter(Presence.status == 1).all()
                not_pres = Lesson.query.join(Presence, Presence.lesson_id == Lesson.id)\
                                      .filter(Lesson.course_id == course.id)\
                                      .filter(Presence.student_id == student.id)\
                                      .filter(Lesson.date.between(start_date, end_date))\
                                      .filter(Presence.status == -1).all()
                not_pres_2 = Lesson.query.join(Presence, Presence.lesson_id == Lesson.id)\
                                      .filter(Lesson.course_id == course.id)\
                                      .filter(Presence.student_id == student.id)\
                                      .filter(Lesson.date.between(start_date, end_date))\
                                      .filter(Presence.status == 2).all()

                payments = Payment.query.filter(Payment.student_id == student.id)\
                                        .filter(Payment.course_id == course.id)\
                                        .filter(Payment.date.between(start_date, end_date)).all()
                this_month_payments = 0
                for payment in payments:
                    this_month_payments += payment.amount
                all_payments = 0
                payments = Payment.query.filter(Payment.student_id == student.id)\
                                        .filter(Payment.course_id == course.id).all()
                for payment in payments:
                    all_payments += payment.amount
                prev_all_presence = Lesson.query.join(Presence, Presence.lesson_id == Lesson.id)\
                                                .filter(Lesson.course_id == course.id)\
                                                .filter(Presence.student_id == student.id)\
                                                .filter(Lesson.date < start_date)\
                                                .filter(Presence.status != 2).all()
                prev_month_debt = len(prev_all_presence) * cost
                prev_month_payments = all_payments - this_month_payments - prev_month_debt
                all_presence = Lesson.query.join(Presence, Presence.lesson_id == Lesson.id)\
                                           .filter(Lesson.course_id == course.id)\
                                           .filter(Presence.student_id == student.id)\
                                           .filter(Lesson.date < end_date)\
                                           .filter(Presence.status != 2).all()
                all_debt = len(all_presence) * cost
                debt = all_payments - all_debt

                result.append({'course': course,
                               'alll': len(alll),
                               'pres': len(pres),
                               'uv': len(not_pres_2),
                               'not_pres': len(not_pres),
                               'student': student,
                               'cost': cost,
                               'this_month_payments': this_month_payments,
                               'prev_month_payments': prev_month_payments,
                               'debt': debt})
                summ_all += cost * len(alll)
                summ_done += cost * (len(pres) + len(not_pres))
                summ_debt += debt
        else:
            result = None
    except:
        flash('Ошибка!', 'error')
        result = None
    return render_template("student_payments.html",
                           title="Отчеты: Платы учеников",
                           result=result,
                           sdate=(datetime.now() - timedelta(days=datetime.now().day- 1) ).strftime('%d.%m.%Y'),
                           edate=(datetime.now()).strftime('%d.%m.%Y'),
                           summ_done=summ_done,
                           summ_all=summ_all,   
                           summ_debt=summ_debt,
                           user=g.user)

####################################################################################################

# @app.route('/ajax', methods=['GET', 'POST'])
# @login_required
# def ajax():
#     """
#         Example of view with ajax
#         This page will be available at '/ajax'
#         As result shows templates/ajax.html template
#     """
#     return render_template("ajax.html",
#                            title="AJAX example",
#                            user=g.user)

@app.route('/login', methods=['GET', 'POST'])
def login():
    """
        User login view
    """
    if g.user and g.user.is_authenticated:
        return redirect(url_for('index'))
    form = LoginForm()
    if form.validate_on_submit():
        username = request.form['username']
        password = request.form['password']
        remember_me = False
        if 'remember_me' in request.form:
            remember_me = True
        registered_user = User.query.filter_by(username=username, password=password).first()
        if registered_user is None:
            flash('Login or password are incorrect!', 'error')
            return redirect(url_for('login'))
        login_user(registered_user, remember = remember_me)
        flash('Вход выполнен!')
        if g.user.teacher:
            return redirect(url_for('index'))
        if g.user.student:
            return redirect(url_for('index'))
        return redirect(url_for('index'))
    return render_template('login.html',
                           title='Login',
                           form=form)

@app.route('/logout')
def logout():
    """
        User logout view
    """
    logout_user()
    return redirect(url_for('index'))

@app.route('/register', methods=['GET', 'POST'])
@login_required
def register():
    """
        User registration view
    """
    if not g.user.is_superuser:
        abort(403)
    form = RegistrationForm()
    if form.validate_on_submit():
        user = User(request.form['username'], request.form['password'], request.form['email'])
        db.session.add(user)
        db.session.commit()
        flash('Пользователь успешно создан!')
        return redirect(url_for('login'))
    return render_template('register.html',
                           title='Registration',
                           form=form,
                           user=g.user)

@app.route('/change/password', methods=['GET', 'POST'])
@login_required
def change_password():
    """

    """
    form = ChangePasswordForm()
    if form.validate_on_submit():
        if g.user.password == request.form['old_password']:
            g.user.password = request.form['new_password']
            db.session.commit()
            flash('Пароль успешно изменен!')
        else:
            flash('Неверно указан старый пароль!')
    return render_template('change_password.html',
                           title='Registration',
                           form=form,
                           user=g.user)

@app.errorhandler(404)
def page_not_found(e):
    """
        'Page not found' exception
    """
    return render_template('404.html',
                           user=g.user), 404

@app.errorhandler(403)
def page_forbidden(e):
    return render_template('403.html'), 403

# @app.route('/sayhello', methods=['POST'])
# @login_required
# def sayhello():
#     """
#         Example of AJAX.
#         Server side gets name from POST request and returns 'Hello, %name%'
#         FYI: for AJAX need to be callen as javascript function from HTML templates
#         In this example, client side in templates/index.html
#     """
#     name = request.form['name']
#     text = 'Hello, %s!' % name
#     return jsonify({'text': text})
