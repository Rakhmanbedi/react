from django.http import HttpResponse
from django.shortcuts import render

def index(request):
    return HttpResponse("Men")

def categories(request, categoryid):
    return HttpResponse(f"<h1>ksdjfjnhsdj</h1><p>{categoryid}</p>")