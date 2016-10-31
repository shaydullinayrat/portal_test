@app.route('/lessonsheet2', methods=['GET', 'POST'])
def lessonsheet2():
    today = datetime.now()
    month_start = today.replace(day=1)
    month_end = month_start.replace(month=month_start.month+1)
    lessons = Lesson.query.join(Course, Lesson.course_id == Course.id)\
                          .join(Timesheet, Lesson.timesheet_id == Timesheet.id)\
                          .filter(Student_course_cost.course_id == Lesson.course_id)\
                          .filter(Lesson.date.between(month_start.strftime('%d-%m-%Y'), month_end.strftime('%d-%m-%Y')))\
                          .order_by(Lesson.date)
    students = Student_course_cost.query.filter(Student_course_cost.course_id == Lesson.course_id).all()                    
    lespresences = Presence.query.join(Lesson, Presence.lesson_id == Lesson.id )\
                                      .filter(Lesson.course_id == Course.id)\
                                      .filter(Lesson.date.between(month_start.strftime('%d-%m-%Y'), month_end.strftime('%d-%m-%Y')))\
                                      .order_by(Lesson.date)
    if request.method == "POST":
        if 'modal_cost' in request.form:
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
            ccourse_id =  int(request.form['modal_course_id'])
            payment = Payment(student_id, ccourse_id, cost, cost_extra, cost_extra_comment)
            db.session.add(payment)
            db.session.commit()
            flash("Оплата занесена в систему!")                                   
        try:
            if 'course_id' in request.form and request.form['course_id']:
                lessons = lessons.filter(Lesson.course_id == request.form['course_id'])
                lespresences = Presence.query.join(Lesson, Presence.lesson_id == Lesson.id )\
                                          .filter(Lesson.course_id == request.form['course_id'])\
                                          .filter(Lesson.date.between(month_start.strftime('%d-%m-%Y'), month_end.strftime('%d-%m-%Y')))\
                                          .order_by(Lesson.date).all()
                students = Student_course_cost.query.filter(Student_course_cost.course_id == request.form['course_id']).all()                          
            if g.user and g.user.is_authenticated and g.user.teacher:
                lessons = lessons.filter(Course.teacher_id == g.user.teacher.id)
            else:
                if 'teacher_id' in request.form and request.form['teacher_id']:
                    lessons = lessons.filter(Course.teacher_id == request.form['teacher_id'])
            if 'month' in request.form and request.form['month']:
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
                lessons = Lesson.query.join(Course, Lesson.course_id == request.form['course_id'])\
                              .join(Timesheet, Lesson.timesheet_id == Timesheet.id)\
                              .filter(Lesson.date.between(month_start2.strftime('%d-%m-%Y'), month_end2.strftime('%d-%m-%Y')))\
                              .order_by(Lesson.date)
                lespresences = Presence.query.join(Lesson, Presence.lesson_id == Lesson.id )\
                                          .filter(Lesson.course_id == request.form['course_id'])\
                                          .filter(Lesson.date.between(month_start2.strftime('%d-%m-%Y'), month_end2.strftime('%d-%m-%Y')))\
                                          .order_by(Lesson.date).all()              
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
    
    
    return render_template("lessonsheet2.html",
                               title="Расписание занятий",
                               lessons=lessons,
                               lespresences=lespresences,
                               students=students,
                               courses = courses,
                               teachers=teachers,
                               places=places,
                               user=g.user)





    {% extends "base.html" %}
{% block content %}
<script>
function more_payment_modal(student_id, lesson_id ){
  $('#student_id').val(student_id)
  $('#lesson_id').val(lesson_id)
  $('#payment_modal').modal('show');
}
function startLesson(id) {
    // Example of client side AJAX
    // function uses jQuery to send async request to server (into '/sayhello' address)
    $.post('{{ url_for('start_lesson') }}', {
        // params, that will be send as 'POST'
        id: id
    }).done(function(data) {
        // actions, that will be done after successfull response
        if (data.res == 1){
            com = '#' + id
            $(com).removeClass('warning')
            $(com).addClass('success')

        }
    }).fail(function() {
        // actions, that will be done after UNsuccessfull response
        alert('error')
    });
}    
function cancelLesson(id) {
    // Example of client side AJAX
    // function uses jQuery to send async request to server (into '/sayhello' address)
    $.post('{{ url_for('cancel_lesson') }}', {
        // params, that will be send as 'POST'
        id: id
    }).done(function(data) {
        // actions, that will be done after successfull response
        if (data.res == 1){
            com = '#' + id
            $(com).addClass('warning')

        }
    }).fail(function() {
        // actions, that will be done after UNsuccessfull response
        alert('error')
    });
}
function check_presence(student_id, lesson_id, status) {
    // Example of client side AJAX
    // function uses jQuery to send async request to server (into '/sayhello' address)
    $.post('{{ url_for("check_presence") }}', {
        // params, that will be send as 'POST'
        student_id: student_id,
        lesson_id: lesson_id,
        status: status
    }).done(function(data) {
        // actions, that will be done after successfull response
        if (data.res == 1){
            com = '#' + student_id + lesson_id
            reason_com = '#reason_' + student_id + lesson_id
            if (status == 1){
              $(com).removeClass('danger')
              $(com).removeClass('info')
              $(com).addClass('success')
              $(reason_com).html('П')
            }else if (status == 2){
              $(com).removeClass('success')
              $(com).removeClass('danger')
              $(com).addClass('info')
              $(reason_com).html('У')
            }else{
              $(com).removeClass('success')
              $(com).removeClass('info')
              $(com).addClass('danger')
              $(reason_com).html('Н')
            }
        }
    }).fail(function() {
        // actions, that will be done after UNsuccessfull response
        alert('error')
    });
}
function cancelLesson(id) {
    // Example of client side AJAX
    // function uses jQuery to send async request to server (into '/sayhello' address)
    $.post('{{ url_for('cancel_lesson') }}', {
        // params, that will be send as 'POST'
        id: id
    }).done(function(data) {
        // actions, that will be done after successfull response
        if (data.res == 1){
            com = '#' + id
            $(com).addClass('danger')
        }
    }).fail(function() {
        // actions, that will be done after UNsuccessfull response
        alert('error')
    });
}
function deleteLesson(id) {
    // Example of client side AJAX
    // function uses jQuery to send async request to server (into '/sayhello' address)
    if (confirm('Вы уверены?')){
      $.post('{{ url_for('delete_lesson') }}', {
          // params, that will be send as 'POST'
          id: id
      }).done(function(data) {
          // actions, that will be done after successfull response
          if (data.res == 1){
              com = '#' + id
              $(com).hide()
          }
      }).fail(function() {
          // actions, that will be done after UNsuccessfull response
          alert('error')
      });
    }
}
</script>
{% if user and user.is_admin%}
<div class="modal" id="payment_modal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title">Оплата</h4>
      </div>
      <form action="" method="POST">
          <div class="modal-body">
            <fieldset>
                <div class="form-group">
                  <label for="inputEmail" class="col-lg-3 control-label">Дата занятия</label>
                  <div class="col-lg-9">
                    <select class="form-control" id="lesson_id" name="lesson_id" >
                      {% for lesson in lessons %}
                      <option value="{{ lesson.id }}">
                        {{ lesson.date.strftime('%d.%m.%y') }}
                      </option>
                      {% endfor %}
                    </select>  
                  </div>
                </div>
                <br/><br/>
                <div class="form-group">
                  <label for="inputEmail" class="col-lg-3 control-label">Ученик</label>
                  <div class="col-lg-9">
                    <select class="form-control" id="student_id" name="student_id">
                      {% for student in students %}
                      <option value="{{ student.student.id }}">
                        {{ student.student.fio }}
                      </option>
                      {% endfor %}
                    </select>
                  </div>
                </div>
                 <br/><br/>
                <div class="form-group">
                  <label for="inputEmail" class="col-lg-3 control-label">Курс</label>
                  <div class="col-lg-9">
                    <select class="form-control"  id="modal_course_id" name="modal_course_id" >
                      {% for course in courses %}
                      {% if course.id|string == request.form.course_id|string %}
                  <option value="{{ course.id }}"
                     selected="selected">{{ course.title }}</option>
                     {% endif %}
                  {% endfor %}
                    </select>
                  </div>
                </div>
                <br/><br/>
                <div class="form-group">
                  <label for="inputEmail" class="col-lg-3 control-label">Сумма</label>
                  <div class="col-lg-9">
                    <input class="form-control" id="modal_cost" name="modal_cost" placeholder="Сумма" type="text">
                  </div>
                </div>
                <br/><br/>
                <div class="form-group">
                  <label for="inputEmail" class="col-lg-3 control-label">Дополнительная плата</label>
                  <div class="col-lg-9">
                    <input class="form-control" id="modal_cost_extra" name="modal_cost_extra" placeholder="Сумма" type="text">
                  </div>
                </div>
                <br/><br/>
                <div class="form-group">
                  <label for="inputEmail" class="col-lg-3 control-label">Комментарий к доп. плате</label>
                  <div class="col-lg-9">
                    <input class="form-control" id="modal_cost_extra_comment" name="modal_cost_extra_comment" placeholder="Комментарий" type="text">
                  </div>
                </div>
            </fieldset>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Закрыть</button>
            <button type="submit" class="btn btn-primary">Оплатить</button>
          </div>
      </form>
    </div>
  </div>
</div>
{% endif %}
<div class="row" >
   {% if user and user.is_admin or user.teacher%}
    <h3><b>Занятия этой недели</b></h3>
    <table class="table table-striped table-hover panel panel-primary">
      <thead class="panel-heading">
        {% if user and user.is_admin%}
        <tr>
          <th class="col-lg-3">Курс</th>
          <th class="col-lg-2 ">Преподаватель</th>
          <th class="col-lg-2">Время</th>
          <th class="col-lg-1">Место</th>
          <th class="col-lg-4"></th>
        </tr>
        {% elif user and user.teacher%}
        <tr>
          <th class="col-lg-5">Курс</th>
          <th class="col-lg-2">Время</th>
          <!-- <th class="col-lg-2">Место</th> -->
          <th class="col-lg-4"></th>
        </tr>
        {% endif%}
      </thead>
      <tbody class="panel-body">
        <tr>
          <form action="" method="POST">
              <td>
                <select class="form-control" id="course_id" name="course_id" onchange='this.form.submit()'>
                  <option value=""></option>
                  {% for course in courses %}
                  <option value="{{ course.id }}"
                    {% if course.id|string == request.form.course_id|string %} selected="selected"{% endif %}>{{ course.title }}</option>
                  {% endfor %}
                </select>
              </td>
              {% if user and user.is_admin%}
              <td>
                <select class="form-control" id="teacher_id" name="teacher_id" onchange='this.form.submit()'>
                  <option value=""></option>
                  {% for teacher in teachers %}
                  <option value="{{ teacher.id }}"
                    {% if teacher.id|string == request.form.teacher_id|string %} selected="selected"{% endif %}>{{ teacher.fio }}</option>
                  {% endfor %}
                </select>
              </td>
              {% endif %}
              <td>
                <select class="form-control" id="month" name="month" onchange='this.form.submit()'>
                  <option value=""></option>
                  <option value="9" {% if request.form.month == '9' %} selected="selected"{% endif %}>
                  Сентябрь</option>
                  <option value="10" {% if request.form.month == '10' %} selected="selected"{% endif %}>
                  Октябрь</option>
                  <option value="11" {% if request.form.month == '11' %} selected="selected"{% endif %}>
                  Ноябрь</option>
                  <option value="12" {% if request.form.month == '12' %} selected="selected"{% endif %}>  
                  Декабрь</option>
                  <option value="1" {% if request.form.month == '1' %} selected="selected"{% endif %}>
                  Январь</option>
                  <option value="2" {% if request.form.month == '2' %} selected="selected"{% endif %}>
                  Февраль</option>
                  <option value="3" {% if request.form.month == '3' %} selected="selected"{% endif %}>
                  Март</option>
                  <option value="4" {% if request.form.month == '4' %} selected="selected"{% endif %}>
                  Апрель</option>
                  <option value="5" {% if request.form.month == '5' %} selected="selected"{% endif %}>
                  Май</option>
                  <option value="6" {% if request.form.month == '6' %} selected="selected"{% endif %}>
                  Июнь</option>
                  <option value="7" {% if request.form.month == '7' %} selected="selected"{% endif %}>
                  Июль</option>
                  <option value="8" {% if request.form.month == '8' %} selected="selected"{% endif %}>
                  Август</option>
                </select>
              </td>
              {% if user and user.is_admin%}
               <td>
                <select class="form-control" id="place" name="place" onchange='this.form.submit()'>
                  <option value=""></option>
                  {% for place in places %}
                    <option value="{{ place.id }}"{% if place.id|string == request.form.place|string %} selected="selected"{% endif %}>{{ place.title }}</option>
                  {% endfor %}
                </select>
              </td>
              {% endif%} 
              <td >
                {% if user and user.is_admin%}
                <button onclick = "document.getElementById('dow').options[0].selected=true; document.getElementById('teacher_id').options[0].selected=true; document.getElementById('course_id').options[0].selected=true; document.getElementById('place').options[0].selected=true;" type="submit" class="btn btn-primary btn-block">Удалить фильтры</button>
                {% elif user and user.teacher%}
                <button onclick = "document.getElementById('dow').options[0].selected=true; document.getElementById('course_id').options[0].selected=true; document.getElementById('place').options[0].selected=true;" type="submit" class="btn btn-primary btn-block ">Удалить фильтры</button>
                {% endif%}
              </td>
          </form> 
        </tr>
        </tbody>
    </table>
    <table class="table table-striped table-bordered table-hover panel panel-primary">
      <thead class="panel-heading">
        {% if user and user.is_admin%}
        <tr>
        <th>День недели</th>
          {% for lesson in lessons %}  
             <th  style = "text-align:center">
              
                    {% if lesson.timesheet.dow == 0 %}
                      Пн
                    {% elif lesson.timesheet.dow == 1 %}
                      Вт
                    {% elif lesson.timesheet.dow == 2 %}
                      Ср
                    {% elif lesson.timesheet.dow == 3 %}
                      Чт
                    {% elif lesson.timesheet.dow == 4 %}
                      Пт
                    {% elif lesson.timesheet.dow == 5 %}
                      Сб
                    {% elif lesson.timesheet.dow == 6 %}
                      Вс
                    {% endif%}
              </th>
          {% endfor %}
        </tr>  
      </thead>
      <tbody class="panel-body">
        <tr>
          <td>Дата</td>
          {% for lesson in lessons %}  
             <td id="{{ lesson.id }}" style = "text-align:center" {% if lesson.status == 1 %} class = "success" {% elif lesson.status == -1 %}  class = "danger" {% endif %}>
                <div class="btn-group ">
                  <a style = " color:grey" href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><b>{{lesson.date.strftime('%d')}}</b></a>
                  <ul class="dropdown-menu">
                     <li><a onclick="startLesson({{ lesson.id }});" href="#">Начать</a></li>
                    <li><a onclick="cancelLesson({{ lesson.id }});" href="#">Отменить</a></li>
                    <li><a href="#">Подробнее</a></li>
                  </ul>
                </div>
              </td>
          {% endfor %}
        </tr>
        {% for student in students%}
        <tr>
          <td>
            {{student.student.fio}}
          </td>
           {%  for lesson in lessons  %}
              <td  id='{{ student.student.id  }}{{ lesson.id  }}' style = "text-align:center" 
                {% for presence in lespresences %}
                  {% if (presence.student_id == student.student.id) and (presence.lesson.date == lesson.date) %}
                    {% if presence.status == 1 %} 
                      class ="success" 
                    {% elif presence.status == 2 %} 
                      class ="info" 
                    {% elif presence.status == -1 %} 
                      class ="danger"  
                    {% else %} 
                      class ="danger" 
                    {% endif %}
                  {% endif %}   
               {% endfor%}>
                  <div class="btn-group">
                    <a  id="reason_{{ student.student.id }}{{ lesson.id  }}" style = "display:'inline-block'; padding:15px; color:grey"  href="" class="dropdown-toggle " data-toggle="dropdown" aria-expanded="false">
                    {% for presence in lespresences %}
                        {% if (presence.student_id == student.student.id) and (presence.lesson.date == lesson.date) %}
                          {% if presence.status == 1 %} 
                            П
                          {% elif presence.status == 2 %} 
                            У 
                          {% elif presence.status == -1 %} 
                            Н  
                          {% else %} 
                            ? 
                          {% endif %}
                        {% endif %}   
                     {% endfor%}
                    </a>
                    <ul class="dropdown-menu">
                      <li><a onclick="check_presence('{{ student.student.id }}', '{{ lesson.id }}', 1);" href="#">Присутствовал</a></li>
                      <li><a onclick="check_presence('{{ student.student.id }}', '{{ lesson.id }}', -1);" href="#">Отсутствовал</a></li>
                      <li><a onclick="check_presence('{{ student.student.id }}', '{{ lesson.id }}', 2);" href="#">Отсутствовал по уважительной причине</a></li>
                      <li><a onclick="more_payment_modal({{ student.student.id }}, '{{ lesson.id }}' );" href="#">Оплата</a></li>
                    </ul>
                  </div>
                </td>
          {% endfor %}
        </tr>
        {% endfor %}
     </tbody>
     {% endif%}
    </table>
    {% endif%} 
</div>

{% endblock %}