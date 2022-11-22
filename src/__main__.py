#!/usr/bin/env python3

import pywebio

@pywebio.config(title="Hello world", theme='dark')
def main_page():
    output.put_text("Hello world")


if __name__ == "__main__":
    pywebio.platform.tornado_http.start_server(
        main_page,
        host="0.0.0.0",
        auto_open_webbrowser=True,
        port=config.PORT,
        debug=config.DEBUG,
        cdn=False)
