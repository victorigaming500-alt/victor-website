"""Give the CSS and JS links in index.html a fresh ?v= tag so browsers
load the new files right after a deploy instead of a cached copy.
Run before each push:  python3 scripts/stamp-version.py"""
import re, time, pathlib
page = pathlib.Path(__file__).resolve().parent.parent / "index.html"
v = time.strftime("%Y%m%d%H%M")
html = page.read_text()
html = re.sub(r'((?:href|src)="(?:css|js)/[\w-]+\.(?:css|js))(\?v=\w+)?"', lambda m: f'{m.group(1)}?v={v}"', html)
page.write_text(html)
print("stamped", v)
