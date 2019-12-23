from django.shortcuts import render

from .models import Client

# Create your views here.
def index(request):
    return render(request, 'index.html', {'Client' : Client})
