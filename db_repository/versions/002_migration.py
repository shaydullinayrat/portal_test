from sqlalchemy import *
from migrate import *


from migrate.changeset import schema
pre_meta = MetaData()
post_meta = MetaData()
tasks = Table('tasks', post_meta,
    Column('id', Integer, primary_key=True, nullable=False),
    Column('homework_id', Integer),
    Column('lesson_id', Integer),
    Column('student_id', Integer),
    Column('title', String(length=100)),
    Column('points', Integer),
    Column('student_answer', String(length=500)),
    Column('duration', Integer),
    Column('teacher_answer', String(length=500)),
    Column('status', Integer, default=ColumnDefault(0)),
)


def upgrade(migrate_engine):
    # Upgrade operations go here. Don't create your own engine; bind
    # migrate_engine to your metadata
    pre_meta.bind = migrate_engine
    post_meta.bind = migrate_engine
    post_meta.tables['tasks'].columns['title'].create()


def downgrade(migrate_engine):
    # Operations to reverse the above upgrade go here.
    pre_meta.bind = migrate_engine
    post_meta.bind = migrate_engine
    post_meta.tables['tasks'].columns['title'].drop()
