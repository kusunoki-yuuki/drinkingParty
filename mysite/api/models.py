from django.db import models

# Create your models here.


class DrinkingParty(models.Model):
    drinking_party_id = models.AutoField(primary_key=True, verbose_name="飲み会ID")
    drinking_party_name = models.CharField(max_length=255, verbose_name="飲み会名")
    date = models.DateField(verbose_name="開催日")
    location = models.CharField(
        max_length=255, null=True, blank=True, verbose_name="場所"
    )
    remarks = models.CharField(
        max_length=255, null=True, blank=True, verbose_name="備考"
    )
    create_date = models.DateTimeField(auto_now_add=True, verbose_name="作成日")
    update_date = models.DateTimeField(auto_now=True, verbose_name="更新日")

    class Meta:
        verbose_name = "飲み会テーブル"
        verbose_name_plural = "飲み会テーブル"

    def __str__(self):
        return f"{self.drinking_party_name} ({self.date})"


class User(models.Model):
    user_id = models.AutoField(primary_key=True, verbose_name="ユーザーID")
    user_name = models.CharField(max_length=255, verbose_name="ユーザー名")
    mail = models.EmailField(
        max_length=255, null=True, blank=True, verbose_name="メールアドレス"
    )

    class Meta:
        verbose_name = "ユーザーマスタ"
        verbose_name_plural = "ユーザーマスタ"

    def __str__(self):
        return self.user_name


class DrinkingPartyPayment(models.Model):
    drinking_party_id = models.IntegerField(verbose_name="飲み会ID")
    user_id = models.IntegerField(verbose_name="ユーザーID")
    fee = models.IntegerField(verbose_name="支払い金額")
    is_paid = models.BooleanField(verbose_name="支払い済みフラグ")
    is_advance_payment = models.BooleanField(verbose_name="建て替えフラグ")
    remarks = models.CharField(
        max_length=255, null=True, blank=True, verbose_name="備考"
    )

    class Meta:
        verbose_name = "飲み会支払いテーブル"
        verbose_name_plural = "飲み会支払いテーブル"
        unique_together = ("drinking_party_id", "user_id")  # 複合キーを指定

    def __str__(self):
        return f"飲み会ID: {self.drinking_party_id}, ユーザーID: {self.user_id}, 支払い金額: {self.fee}円"
