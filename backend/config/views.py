from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from config.users.models import Expense


@api_view(['POST'])
def register_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already taken'}, status=400)

    User.objects.create_user(username=username, password=password)
    return Response({'message': 'User created'}, status=201)


@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({'access': str(refresh.access_token)})

    return Response({'error': 'Invalid credentials'}, status=401)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addExpense(request):
    amount = request.data.get('amount')
    category = request.data.get('category')
    date = request.data.get('date')

    Expense.objects.create(amount=amount, category=category, date=date, user=request.user)
    return Response({'message': 'Expense added'}, status=201)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listExpenses(request):
    expenses = Expense.objects.filter(user=request.user)
    if expenses.exists():
        return Response(list(expenses.values()), status=200)
    return Response({'message': 'No Expenses Recorded'})

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteExpense(request):
    id = request.data.get('id')
    expense = Expense.objects.filter(id=id, user=request.user).first()

    if not expense:
        return Response({'error': 'Expense not found'}, status=404)

    expense.delete()
    return Response(status=204)
