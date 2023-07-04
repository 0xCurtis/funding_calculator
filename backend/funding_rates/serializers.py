from rest_framework import serializers
from .models import Funding


class FundingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Funding
        fields = ('id', 'pair', 'description', 'rate')
