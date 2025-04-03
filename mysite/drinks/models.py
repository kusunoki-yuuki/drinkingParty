from django.db import models

# Create your models here.

class Drink(models.Model):
    name = models.CharField(max_length=100)  # 飲み物名
    quantity = models.PositiveIntegerField()  # 杯数
    date = models.DateField(auto_now_add=True)  # 飲んだ日付

    def __str__(self):
        return f"{self.name} - {self.quantity} 杯"