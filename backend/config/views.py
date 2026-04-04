from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse
from config.users.models import Expense

def index(request):
    return render(request, 'index.html')

def dashboard(request):
    return render(request, 'dashboard.html')

def add(request):
    if request.method == 'GET':
        return render(request, 'addExpense.html')
    
    if request.method == 'POST':
        amount = request.POST.get('amount')
        category = request.POST.get('category')
        date = request.POST.get('date')
        Expense.objects.create(amount=amount, category=category, date=date, user=request.user)
        return render(request, 'dashboard.html')

def list(request):
    expenses = Expense.objects.all()
    context = {'expenses': expenses}
    return render(request, 'listExpense.html', context)

def delete(request):
    if request.method == 'GET':
        expenses = Expense.objects.all()
        context = {'expenses': expenses}
        return render(request, 'deleteExpense.html', context)
    
    if request.method == 'POST':
        expense_id = request.POST.get('expense_id')
        expense = get_object_or_404(Expense, id=expense_id)

        expense.delete()
        return redirect('delete')
