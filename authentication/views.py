import json

from rest_framework import permissions, viewsets, response, status, views
from authentication.models import Account
from django.contrib.auth import authenticate, login, logout

import authentication.permissions as auth_permissions
import authentication.serializers as auth_serializers


class AccountViewSet(viewsets.ModelViewSet):

    lookup_field = 'username'
    queryset = Account.objects.all()
    serializer_class = auth_serializers.AccountSerializer

    def get_permissions(self):

        if self.request.method == 'POST':
            return [permissions.AllowAny()]

        return [permissions.IsAuthenticated(), auth_permissions.IsAccountOwner()]

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid(raise_exception=True):
            Account.objects.create_user(**serializer.validated_data)
            return response.Response(serializer.validated_data, status=status.HTTP_201_CREATED)


class LoginView(views.APIView):

    def post(self, request):
        data = request.data
        email = data.get('email', None)
        password = data.get('password', None)
        account = authenticate(email=email, password=password)

        if account is not None:
            if account.is_active:
                login(request, account)
                serialized = auth_serializers.AccountSerializer(account)
                return response.Response(serialized.data)

        return response.Response({
            'status': 'Unauthorized',
            'message': 'invalid email/password or inactive account.'
        }, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        logout(request)
        return response.Response({}, status=status.HTTP_204_NO_CONTENT)