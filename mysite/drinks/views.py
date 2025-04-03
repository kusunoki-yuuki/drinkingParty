from django.shortcuts import render, redirect
from .models import Drink
from django.utils.timezone import now

# 飲み物の一覧表示
def drink_list(request):
    drinks = Drink.objects.all().order_by('-date')
    return render(request, 'drinks/drink_list.html', {'drinks': drinks})

# 飲み物の登録
def add_drink(request):
    if request.method == "POST":
        name = request.POST['name']
        quantity = int(request.POST['quantity'])
        Drink.objects.create(name=name, quantity=quantity, date=now().date())
        return redirect('drink_list')
    return render(request, 'drinks/add_drink.html')

# 飲み物の削除
def delete_drink(request, drink_id):
    drink = Drink.objects.get(id=drink_id)
    drink.delete()
    return redirect('drink_list')
