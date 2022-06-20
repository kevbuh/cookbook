
# Create your views here.
# from .models import CustomUser
from rest_framework import permissions, status
from .serializers import UserSerializer, ChangePasswordSerializer, UpdateUserSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
# from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import RegisterSerializer
from rest_framework import generics
from .models import CustomUser
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken, OutstandingToken, BlacklistedToken
from rest_framework.response import Response

# class MyObtainTokenPairView(TokenObtainPairView):
#     permission_classes = (AllowAny,)
#     serializer_class = MyTokenObtainPairSerializer

# class UserView(generics.RetrieveAPIView):
#     """
#     API endpoint that allows users to be viewed or edited.
#     """
#     permission_classes = [permissions.IsAuthenticated]
#     queryset = CustomUser.objects.all()
#     serializer_class = UserSerializer
class LoadUserView(APIView):
    def get(self, request, format=None):
        try:
            user = request.user
            user = UserSerializer(user)

            return Response({'user': user.data},status=status.HTTP_200_OK)
        except:
            return Response({'error': 'Something went wrong when trying to load user'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class RegisterView(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    queryset = CustomUser.objects.all()
    serializer_class = RegisterSerializer

class ChangePasswordView(generics.UpdateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = CustomUser.objects.all()
    serializer_class = ChangePasswordSerializer


class UpdateProfileView(generics.UpdateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = CustomUser.objects.all()
    serializer_class = UpdateUserSerializer

class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class LogoutAllView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        tokens = OutstandingToken.objects.filter(user_id=request.user.id)
        for token in tokens:
            t, _ = BlacklistedToken.objects.get_or_create(token=token)

        return Response(status=status.HTTP_205_RESET_CONTENT)