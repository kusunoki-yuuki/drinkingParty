from rest_framework import serializers
from .models import Item


# Itemモデルのシリアライザ
class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item  # 対象モデルを指定
        fields = "__all__"  # すべてのフィールドをシリアライズ
