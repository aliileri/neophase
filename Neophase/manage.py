#!/usr/bin/env python
import os
import sys


def main() -> None:
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Neophase.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Django yüklü değil gibi görünüyor. Sanal ortamı ve bağımlılıkları kontrol edin."
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()





