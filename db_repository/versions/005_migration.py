from sqlalchemy import *
from migrate import *


from migrate.changeset import schema
pre_meta = MetaData()
post_meta = MetaData()
places = Table('places', post_meta,
    Column('id', Integer, primary_key=True, nullable=False),
    Column('title', String(length=50)),
)

timesheets = Table('timesheets', pre_meta,
    Column('id', INTEGER, primary_key=True, nullable=False),
    Column('course_id', INTEGER),
    Column('place', VARCHAR(length=50)),
    Column('dow', INTEGER),
    Column('hod', INTEGER),
    Column('moh', INTEGER),
)

timesheets = Table('timesheets', post_meta,
    Column('id', Integer, primary_key=True, nullable=False),
    Column('course_id', Integer),
    Column('place_id', Integer),
    Column('dow', Integer),
    Column('hod', Integer),
    Column('moh', Integer),
)

students = Table('students', post_meta,
    Column('id', Integer, primary_key=True, nullable=False),
    Column('user_id', Integer),
    Column('fio', String(length=50)),
    Column('parent', String(length=150)),
    Column('phone', String(length=50)),
    Column('age', DateTime),
    Column('avg_points', Integer),
)


def upgrade(migrate_engine):
    # Upgrade operations go here. Don't create your own engine; bind
    # migrate_engine to your metadata
    pre_meta.bind = migrate_engine
    post_meta.bind = migrate_engine
    post_meta.tables['places'].create()
    pre_meta.tables['timesheets'].columns['place'].drop()
    post_meta.tables['timesheets'].columns['place_id'].create()
    post_meta.tables['students'].columns['avg_points'].create()


def downgrade(migrate_engine):
    # Operations to reverse the above upgrade go here.
    pre_meta.bind = migrate_engine
    post_meta.bind = migrate_engine
    post_meta.tables['places'].drop()
    pre_meta.tables['timesheets'].columns['place'].create()
    post_meta.tables['timesheets'].columns['place_id'].drop()
    post_meta.tables['students'].columns['avg_points'].drop()
