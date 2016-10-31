from sqlalchemy import *
from migrate import *


from migrate.changeset import schema
pre_meta = MetaData()
post_meta = MetaData()
lessons = Table('lessons', post_meta,
    Column('id', Integer, primary_key=True, nullable=False),
    Column('course_id', Integer),
    Column('timesheet_id', Integer),
    Column('text', String(length=5000)),
    Column('date', DateTime),
    Column('status', Integer),
)


def upgrade(migrate_engine):
    # Upgrade operations go here. Don't create your own engine; bind
    # migrate_engine to your metadata
    pre_meta.bind = migrate_engine
    post_meta.bind = migrate_engine
    post_meta.tables['lessons'].columns['timesheet_id'].create()


def downgrade(migrate_engine):
    # Operations to reverse the above upgrade go here.
    pre_meta.bind = migrate_engine
    post_meta.bind = migrate_engine
    post_meta.tables['lessons'].columns['timesheet_id'].drop()
