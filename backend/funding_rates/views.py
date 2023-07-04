from django.shortcuts import render
from rest_framework import viewsets
from .serializers import FundingSerializer
from .models import Funding


# Create your views here.

class FundingView(viewsets.ModelViewSet):
    serializer_class = FundingSerializer
    queryset = Funding.objects.all()
