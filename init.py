from app import models, db
u = models.User('superman', 'iamsuper', 'super@gmail.com', 'true')
u.is_superuser = True
db.session.add(u)
u = models.User('admin', 'admin', 'admin@gmail.com', 'true')
u.is_superuser = False
db.session.add(u)
db.session.commit()
