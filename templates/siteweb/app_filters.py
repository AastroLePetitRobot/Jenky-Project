from django import template
from datetime import date

register = template.Library()

@register.filter(is_safe=False)
def modulo(value, arg):
    return int(value) % int(arg)