from app import db
import datetime

class Center(db.Model):
    __tablename__ = "centers"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50))
    users = db.relationship('User', backref='center', lazy='dynamic')
    places = db.relationship('Place', backref='center', lazy='dynamic')
    courses = db.relationship('Course', backref='center', lazy='dynamic')
    def __init__(self, title):
        self.title = title

class User(db.Model):
    __tablename__ = "users"
    id = db.Column('user_id', db.Integer, primary_key=True)
    username = db.Column('username', db.String(50), unique=True, index=True)
    password = db.Column('password', db.String(10))
    email = db.Column('email', db.String(50))
    is_active = db.Column(db.Boolean, default=True)
    is_admin = db.Column(db.Boolean, default=False)
    is_superuser = db.Column(db.Boolean, default=False)
    student = db.relationship("Student", uselist=False, backref="user")
    teacher = db.relationship("Teacher", uselist=False, backref="user")
    center_id = db.Column(db.Integer, db.ForeignKey('centers.id'))
    def __init__(self, username, password, email, is_admin):
        self.username = username
        self.password = password
        self.email = email
        self.is_active = True
        self.is_admin = is_admin
        # self.is_admin = False
        self.is_superuser = False

    def is_authenticated(self):
        return True

    def is_active(self):
        return self.is_active

    def is_anonymous(self):
        return False

    def get_id(self):
        try:
            return unicode(self.id)  # python 2
        except NameError:
            return str(self.id)  # python 3

    def __repr__(self):
        return '<User %r>' % (self.username)

class Student(db.Model):
    __tablename__ = "students"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    fio = db.Column(db.String(50), unique=True, index=True)
    parent = db.Column(db.String(150))
    phone = db.Column(db.String(50))
    age = db.Column(db.DateTime)
    avg_points = db.Column(db.Integer)
    courses = db.relationship('Student_course_cost', backref='student', lazy='dynamic')
    lessons = db.relationship('Presence', backref='student', lazy='dynamic')
    tasks = db.relationship('Task', backref='student', lazy='dynamic')
    payments= db.relationship('Payment', backref='student', lazy='dynamic', order_by="-Payment.id")

    def __init__(self, fio, parent, phone, age):
        self.fio = fio
        self.parent = parent
        self.phone = phone
        self.age = age
        self.avg_points = 0

    def __repr__(self):
        return '<Student %r>' % (self.fio)

    def myage(self):
        today = datetime.date.today()
        if self.age.year == 1900:
            return 0
        else:    
            return today.year - self.age.year - ((today.month, today.day) < (self.age.month, self.age.day))   

    def myclass(self):
        if self.age.year == 1900:
            return 0
        else:    
            return self.myage() - 6   

class Teacher(db.Model):
    __tablename__ = "teachers"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    fio = db.Column(db.String(50), unique=True, index=True)
    phone = db.Column(db.String(50))
    courses = db.relationship('Course', backref='teacher', lazy='dynamic')

    def __init__(self, fio, phone):
        self.fio = fio
        self.phone = phone

    def __repr__(self):
        return '<Teacher %r>' % (self.fio)

class Discipline(db.Model):
    __tablename__ = "disciplines"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), unique=True, index=True)
    courses = db.relationship('Course', backref='discipline', lazy='dynamic')

    def __init__(self, title):
        self.title = title

    def __repr__(self):
        return '<Discipline %r>' % (self.title)

class Course(db.Model):
    __tablename__ = "courses"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), unique=True, index=True)
    discipline_id = db.Column(db.Integer, db.ForeignKey('disciplines.id'))
    teacher_id = db.Column(db.Integer, db.ForeignKey('teachers.id'))
    cost = db.Column(db.Integer)
    student_cost = db.Column(db.Integer)
    start_date = db.Column(db.DateTime)
    end_date = db.Column(db.DateTime)
    times = db.relationship('Timesheet', backref='course', lazy='dynamic', order_by="Timesheet.dow")
    students = db.relationship('Student_course_cost', backref='course', lazy='dynamic')
    lessons = db.relationship('Lesson', backref='course', lazy='dynamic', order_by="Lesson.date")
    payments = db.relationship('Payment', backref='course', lazy='dynamic', order_by="Payment.id")
    center_id = db.Column(db.Integer, db.ForeignKey('centers.id'))
    def __init__(self, title, discipline_id, teacher_id, cost, student_cost, start_date, end_date):
        self.title = title
        self.discipline_id = discipline_id
        self.teacher_id = teacher_id
        self.cost = cost
        self.student_cost = student_cost
        self.start_date = start_date
        self.end_date = end_date

    def __repr__(self):
        return '<Course %r %r>' % (self.title, self.teacher.fio)

class Place(db.Model):
    __tablename__ = "places"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50))
    times = db.relationship('Timesheet', backref='place', lazy='dynamic')
    center_id = db.Column(db.Integer, db.ForeignKey('centers.id'))
    def __init__(self, title):
        self.title = title
    def __repr__(self):
        return '<%r >' % (self.center.title)    

class Timesheet(db.Model):
    __tablename__ = "timesheets"
    id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'))
    place_id = db.Column(db.Integer, db.ForeignKey('places.id'), nullable=True)
    dow = db.Column(db.Integer)
    hod = db.Column(db.Integer)
    moh = db.Column(db.Integer)
    hoe = db.Column(db.Integer)
    moe = db.Column(db.Integer)
    lessons = db.relationship('Lesson', backref='timesheet', lazy='dynamic')

    def __init__(self, course_id, place_id, dow, hod, moh, hoe, moe):
        self.course_id = course_id
        self.place_id = place_id
        self.dow = dow
        self.hod = hod
        self.moh = moh
        self.hoe = hoe
        self.moe = moe

    def __repr__(self):
        return '<Time Sheet %r %r %r %r %r %r %r>' % (self.course.title, 
                                                self.course.teacher.fio, 
                                                self.dow,
                                                self.hod, 
                                                self.moh,
                                                self.hoe, 
                                                self.moe)

class Student_course_cost(db.Model):
    __tablename__ = "student_course"
    id = db.Column(db.Integer, primary_key=True)    
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'))
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'))
    cost = db.Column(db.Integer)
    comment = db.Column(db.String(50))

    def __init__(self, course_id, student_id, cost, comment):
        self.course_id = course_id
        self.student_id = student_id
        self.cost = cost
        self.comment = comment

    def __repr__(self):
        return '<%r %r %r %r>' % (self.student.fio, self.course.title, self.cost, self.comment)

class Lesson(db.Model):
    __tablename__ = "lessons"
    id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'))
    timesheet_id = db.Column(db.Integer, db.ForeignKey('timesheets.id'))
    title = db.Column(db.String(100), default='')
    text = db.Column(db.String(5000))
    date = db.Column(db.DateTime)
    status = db.Column(db.Integer)
    students = db.relationship('Presence', backref='lesson', lazy='dynamic')
    tasks = db.relationship('Task', backref='lesson', lazy='dynamic', order_by="Task.student_id")

    def __init__(self, course_id, timesheet_id, date):
        self.course_id = course_id
        self.timesheet_id = timesheet_id
        self.date = date
        self.status = 0
        self.title = ''

    def __repr__(self):
        return '<Lesson %r %r %r>' % (self.course.title, self.title, self.date.strftime('%d.%m.%Y'))

class Presence(db.Model):
    __tablename__ = "presences"
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'))
    lesson_id = db.Column(db.Integer, db.ForeignKey('lessons.id'))
    status = db.Column(db.Integer)

    def __init__(self, student_id, lesson_id, status):
        self.student_id = student_id
        self.lesson_id = lesson_id
        self.status = status

    def __repr__(self):
        return '<Presence of %r %r %r>' % (self.student.fio, 
                                           self.lesson.date.strftime('%d.%m.%Y'), 
                                           self.status)

class Homework(db.Model):
    __tablename__ = "homeworks"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50))
    text = db.Column(db.Text)
    args = db.relationship('Homeworkarg', backref='homework', lazy='dynamic')
    tasks = db.relationship('Task', backref='homework', lazy='dynamic')

    def __init__(self, title, text):
        self.title = title
        self.text = text

    def __repr__(self):
        return '<Homework %s>' % self.title

class Task(db.Model):
    __tablename__ = "tasks"
    id = db.Column(db.Integer, primary_key=True)
    homework_id = db.Column(db.Integer, db.ForeignKey('homeworks.id'))
    lesson_id = db.Column(db.Integer, db.ForeignKey('lessons.id'))
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'))
    title = db.Column(db.String(100))
    points = db.Column(db.Integer)
    student_answer = db.Column(db.String(500))
    duration = db.Column(db.String(50))
    teacher_answer = db.Column(db.String(500))
    status = db.Column(db.Integer, default=0)
    args = db.relationship('Taskarg', backref='task', lazy='dynamic')

    def __init__(self, homework_id, lesson_id, student_id, title):
        self.homework_id = homework_id
        self.lesson_id = lesson_id
        self.student_id = student_id
        self.title = title
        self.status = 0

    def __repr__(self):
        return '<Task %s to %s>' % (self.homework.title, self.student.fio)

class Homeworkarg(db.Model):
    __tablename__ = "homeworkargs"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50))
    homework_id = db.Column(db.Integer, db.ForeignKey('homeworks.id'))
    values = db.relationship('Taskarg', backref='arg', lazy='dynamic')

    def __init__(self, title):
        self.title = title

class Taskarg(db.Model):
    __tablename__ = "taskargs"
    id = db.Column(db.Integer, primary_key=True)
    task_id = db.Column(db.Integer, db.ForeignKey('tasks.id'))
    arg_id = db.Column(db.Integer, db.ForeignKey('homeworkargs.id'))
    value = db.Column(db.String(50))

    def __init__(self, arg_id, value):
        self.arg_id = arg_id
        self.value = value

class Payment(db.Model):
    __tablename__ = "payments"
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'))
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'))
    date = db.Column(db.DateTime)
    amount = db.Column(db.Integer)
    amount_extra = db.Column(db.Integer)
    comment_extra = db.Column(db.String(50))

    def __init__(self, student_id, course_id, amount, amount_extra, comment_extra, date):
        self.date = date
        self.student_id = student_id
        self.course_id = course_id
        self.amount = amount
        self.amount_extra = amount_extra
        self.comment_extra = comment_extra
