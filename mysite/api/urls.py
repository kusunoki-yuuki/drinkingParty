from django.urls import path
from . import views

urlpatterns = [
    path("drinkPartyList", views.drinkPartyList, name="drinkPartyList"),  # 一覧表示
    # path('add/', views.add_drink, name='add_drink'),  # 新規登録
    # path('delete/<int:drink_id>/', views.delete_drink, name='delete_drink'),  # 削除
]
