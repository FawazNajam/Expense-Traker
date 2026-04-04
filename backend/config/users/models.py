from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings

class User(AbstractUser):
    pass

class Expense(models.Model):
    CATEGORY_CHOICES = [
        ('food', 'Food'),
        ('transport', 'Transport'),
        ('utilities', 'Utilities'),
        ('groceries', 'Groceries'),
        ('other', 'Other'),
    ]

    amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES)
    date = models.DateField()

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)