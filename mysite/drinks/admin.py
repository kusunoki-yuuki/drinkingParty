from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Drink

@admin.register(Drink)
class DrinkAdmin(admin.ModelAdmin):
    list_display = ('name', 'quantity', 'date')