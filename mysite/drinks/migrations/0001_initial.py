# Generated by Django 5.1.7 on 2025-04-14 14:02

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Drink',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('quantity', models.PositiveIntegerField()),
                ('date', models.DateField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='DrinkingParty',
            fields=[
                ('drinking_party_id', models.AutoField(primary_key=True, serialize=False, verbose_name='飲み会ID')),
                ('drinking_party_name', models.CharField(max_length=255, verbose_name='飲み会名')),
                ('date', models.DateField(verbose_name='開催日')),
                ('location', models.CharField(blank=True, max_length=255, null=True, verbose_name='場所')),
                ('remarks', models.CharField(blank=True, max_length=255, null=True, verbose_name='備考')),
                ('create_date', models.DateTimeField(auto_now_add=True, verbose_name='作成日')),
                ('update_date', models.DateTimeField(auto_now=True, verbose_name='更新日')),
            ],
            options={
                'verbose_name': '飲み会テーブル',
                'verbose_name_plural': '飲み会テーブル',
            },
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('user_id', models.AutoField(primary_key=True, serialize=False, verbose_name='ユーザーID')),
                ('user_name', models.CharField(max_length=255, verbose_name='ユーザー名')),
                ('mail', models.EmailField(blank=True, max_length=255, null=True, verbose_name='メールアドレス')),
            ],
            options={
                'verbose_name': 'ユーザーマスタ',
                'verbose_name_plural': 'ユーザーマスタ',
            },
        ),
        migrations.CreateModel(
            name='DrinkingPartyPayment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('drinking_party_id', models.IntegerField(verbose_name='飲み会ID')),
                ('user_id', models.IntegerField(verbose_name='ユーザーID')),
                ('fee', models.IntegerField(verbose_name='支払い金額')),
                ('is_paid', models.BooleanField(verbose_name='支払い済みフラグ')),
                ('is_advance_payment', models.BooleanField(verbose_name='建て替えフラグ')),
                ('remarks', models.CharField(blank=True, max_length=255, null=True, verbose_name='備考')),
            ],
            options={
                'verbose_name': '飲み会支払いテーブル',
                'verbose_name_plural': '飲み会支払いテーブル',
                'unique_together': {('drinking_party_id', 'user_id')},
            },
        ),
    ]
