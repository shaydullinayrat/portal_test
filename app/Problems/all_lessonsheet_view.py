@app.route('/lessonsheet2/<course_id>', methods=['GET', 'POST'])
def lessonsheet2(course_id):
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
    
    if request.method == "POST":
        try:     
            if 'modal_pay' in request.form:
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
                lesson_id = request.form['lesson_id']
                lesson = Lesson.query.get(lesson_id) 
                now_date = lesson.date.strftime('%d.%m.%y')
                # now_date = datetime.strptime(request.form['lesson_id'], '%d.%m.%Y')
                payment = Payment(student_id, course_id, pay, pay_extra, pay_extra_comment, now_date)
                db.session.add(payment)
                db.session.commit()
                flash("Оплата занесена в систему!")  
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

            elif 'modal_id_info' in request.form:
                    if request.form['modal_id_info'] == '':
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
                            student = Student.query.get(request.form['modal_id_info'])
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
    return render_template("lessonsheet2.html",
                               title="Расписание занятий",
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