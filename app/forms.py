from flask.ext.wtf import Form
from wtforms import TextField, BooleanField, PasswordField
from wtforms.validators import Required, EqualTo, Email

from .utils.validators import Unique
from .models import User

class LoginForm(Form):
    username = TextField('username', validators = [Required()])
    password = PasswordField('password', [Required()])
    remember_me = BooleanField('remember_me', default = True)

class RegistrationForm(Form):
    username = TextField('username', validators = [
            Required(),
            Unique(
                User,
                User.username,
                message='There is already an account with that name.')
    ])
    password = PasswordField('password', [
        Required(),
        EqualTo('confirm', message='Passwords must match')
    ])
    confirm = PasswordField('Repeat Password')
    email = TextField('email', validators = [
            Required(),
            Email(),
            Unique(
                User,
                User.email,
                message='There is already an account with that email.')
    ])

class ChangePasswordForm(Form):
    old_password = PasswordField('old_password')
    new_password = PasswordField('old_password', [
        Required(),
        EqualTo('confirm', message='Passwords must match')
    ])
    confirm = PasswordField('Repeat Password')
