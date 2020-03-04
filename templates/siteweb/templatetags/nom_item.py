from django.template.defaulttags import register

@register.filter
def get_item(key):
    key = str(key)
    with open('siteweb/templatetags/nom.txt') as f:
        d = dict(x.rstrip().split(None, 1) for x in f)
    return d.get(key)