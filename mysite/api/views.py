from django.shortcuts import render

# Create your views here.
from django.shortcuts import render, redirect

# from .models import Drink
from django.utils.timezone import now
from .models import DrinkingParty
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


# 飲み物の一覧表示
@csrf_exempt
def drinkPartyList(request):
    if request.method == "GET":
        # DrinkingPartyモデルから全件取得
        drinkingPartys = DrinkingParty.objects.all().values()
        # DrinkingPartyモデルのデータを整形してリストに変換
        drinkingParty_list = []
        for drinkingParty in drinkingPartys:
            drinkingParty_list.append(
                {
                    "drinking_party_id": drinkingParty["drinking_party_id"],
                    "drinking_party_name": drinkingParty["drinking_party_name"],
                    "date": drinkingParty["date"].strftime("%Y-%m-%d"),
                    "location": drinkingParty["location"],
                    "participants": 10,
                }
            )
        return JsonResponse(drinkingParty_list, safe=False)
    else:
        # GET以外のリクエストは許可しない
        return JsonResponse(
            {"エラー": "このエンドポイントはGETリクエストのみ対応しています。"},
            status=405,
        )


# # 飲み物の登録
# def add_drink(request):
#     if request.method == "POST":
#         name = request.POST["name"]
#         quantity = int(request.POST["quantity"])
#         Drink.objects.create(name=name, quantity=quantity, date=now().date())
#         return redirect("drink_list")
#     return render(request, "drinks/add_drink.html")


# # 飲み物の削除
# def delete_drink(request, drink_id):
#     drink = Drink.objects.get(id=drink_id)
#     drink.delete()
#     return redirect("drink_list")
