from server.main import app

for route in app.routes:
    path = getattr(route, "path", "No path")
    methods = getattr(route, "methods", "No methods")
    print(f"{path} {methods}")
