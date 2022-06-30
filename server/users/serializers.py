# from .models import CustomUser
from rest_framework import serializers
from django.utils.timezone import now
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from .models import CustomUser


class UserSerializer(serializers.ModelSerializer):
    days_since_joined = serializers.SerializerMethodField()
    favorite_recipes = serializers.SerializerMethodField()
    grocery_list = serializers.SerializerMethodField()


    class Meta:
        model = CustomUser
        fields = '__all__'

    def get_days_since_joined(self, obj):
        return (now() - obj.date_joined).days

    def get_favorite_recipes(self, obj):
        user = CustomUser.objects.get(id=obj.id)
        return user.favorites.values('liked_recipe')
    
    def get_grocery_list(self, obj):
        user = CustomUser.objects.get(id=obj.id)
        return user.grocerylists.values('author')


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=CustomUser.objects.all())]
            )

    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = CustomUser
        fields = ('password', 'password2', 'email')
        # extra_kwargs = {
        #     'first_name': {'required': True},
        #     'last_name': {'required': True}
        # }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = CustomUser.objects.create(
            # username=validated_data['username'],
            email=validated_data['email'],
            # first_name=validated_data['first_name'],
            # last_name=validated_data['last_name']
        )

        
        user.set_password(validated_data['password'])
        user.save()

        return user


class ChangePasswordSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    old_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = CustomUser
        fields = ('old_password', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError({"old_password": "Old password is not correct"})
        return value

    def update(self, instance, validated_data):
        user = self.context['request'].user

        if user.pk != instance.pk:
            raise serializers.ValidationError({"authorize": "You dont have permission for this user."})

        instance.set_password(validated_data['password'])
        instance.save()

        return instance

class UpdateUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    first_name = serializers.CharField(required=True)
    is_premium = serializers.BooleanField(required=True)

    class Meta:
        model = CustomUser
        fields = ('username', 'first_name', 'last_name', 'email', 'is_premium')
        # extra_kwargs = {
            # 'first_name': {'required': True},
            # 'last_name': {'required': True},
        # }

    def validate_email(self, value):
        user = self.context['request'].user
        if CustomUser.objects.exclude(pk=user.pk).filter(email=value).exists():
            raise serializers.ValidationError({"email": "This email is already in use."})
        return value

    # def validate_username(self, value):
        # user = self.context['request'].user
        # if CustomUser.objects.exclude(pk=user.pk).filter(username=value).exists():
            # raise serializers.ValidationError({"username": "This username is already in use."})
        # return value

    def update(self, instance, validated_data):
        user = self.context['request'].user

        print("HERE IN STRIPE:::", validated_data)

        if user.pk != instance.pk:
            raise serializers.ValidationError({"authorize": "You dont have permission for this user."})

        # instance.first_name = validated_data['first_name']
        # instance.last_name = validated_data['last_name']
        instance.email = validated_data['email']
        instance.first_name = validated_data['first_name']
        instance.is_premium = validated_data['is_premium']


        # instance.username = validated_data['username']

        instance.save()

        return instance