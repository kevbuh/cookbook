from .models import CustomUser
from rest_framework import serializers
from django.utils.timezone import now



class UserSerializer(serializers.ModelSerializer):
    days_since_joined = serializers.SerializerMethodField()
    class Meta:
        model = CustomUser
        fields = '__all__'

    def get_days_since_joined(self, obj):
        return (now() - obj.date_joined).days

