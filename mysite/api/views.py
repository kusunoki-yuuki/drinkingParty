from django.shortcuts import render

# Create your views here.
from django.shortcuts import render, redirect

# from .models import Drink
from django.utils.timezone import now
from .models import DrinkingParty
from .models import DrinkingPartyPayment
from .models import User
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
            participant_count = DrinkingPartyPayment.objects.filter(
                drinking_party_id=drinkingParty["drinking_party_id"]
            ).count()
            drinkingParty_list.append(
                {
                    "drinking_party_id": drinkingParty["drinking_party_id"],
                    "drinking_party_name": drinkingParty["drinking_party_name"],
                    "date": drinkingParty["date"].strftime("%Y-%m-%d"),
                    "location": drinkingParty["location"],
                    "participants": participant_count,
                }
            )
        return JsonResponse(drinkingParty_list, safe=False)
    else:
        # GET以外のリクエストは許可しない
        return JsonResponse(
            {"エラー": "このエンドポイントはGETリクエストのみ対応しています。"},
            status=405,
        )


def drinkPartyDetail(request, id):
    if request.method == "GET":
        # 引数のidからdrinkingDetail画面に表示に必要な情報を取得
        drinkingParty = (
            DrinkingParty.objects.filter(drinking_party_id=id).values().first()
        )

        drinkingPartyPayments = DrinkingPartyPayment.objects.filter(
            drinking_party_id=drinkingParty["drinking_party_id"]
        ).values()
        # DrinkingPartyモデルのデータを整形してリストに変換
        # drinkingDetail_list = []
        drinkingDetail_list = {
            "drinking_party_id": drinkingParty["drinking_party_id"],
            "drinking_party_name": drinkingParty["drinking_party_name"],
            "date": drinkingParty["date"].strftime("%Y-%m-%d"),
            "location": drinkingParty["location"],
            "remarks": drinkingParty["remarks"],
            "participants": [
                {
                    "user_id": payment["user_id"],
                    "user_name": User.objects.get(id=payment["user_id"]).user_name,
                    "fee": payment["fee"],
                    "is_paid": payment["is_paid"],
                    "is_advance_payment": payment["is_advance_payment"],
                    "remarks": payment["remarks"],
                }
                for payment in drinkingPartyPayments
            ],
        }

        return JsonResponse(drinkingDetail_list, safe=False)
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
