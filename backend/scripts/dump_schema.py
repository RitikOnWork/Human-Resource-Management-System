import sqlite3
from pathlib import Path
import sys

DB_PATH = Path(__file__).resolve().parents[1] / 'instance' / 'database.db'
if not DB_PATH.exists():
    print('Database not found at', DB_PATH)
    sys.exit(1)

con = sqlite3.connect(str(DB_PATH))
cur = con.cursor()
rows = cur.execute("SELECT name, sql FROM sqlite_master WHERE type='table'").fetchall()
for name, sql in rows:
    print(f"--- TABLE: {name} ---")
    print(sql)
    print()

con.close()