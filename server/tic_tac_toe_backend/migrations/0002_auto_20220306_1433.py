# Generated by Django 3.2.9 on 2022-03-06 19:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tic_tac_toe_backend', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='inventory',
            old_name='player_id',
            new_name='player',
        ),
        migrations.RenameField(
            model_name='inventoryitem',
            old_name='inventory_id',
            new_name='inventory',
        ),
        migrations.RenameField(
            model_name='moves',
            old_name='board_id',
            new_name='board',
        ),
        migrations.RenameField(
            model_name='newmove',
            old_name='game_status_id',
            new_name='game_status',
        ),
        migrations.RenameField(
            model_name='player',
            old_name='players_id',
            new_name='players',
        ),
        migrations.RenameField(
            model_name='players',
            old_name='lobby_id',
            new_name='lobby',
        ),
        migrations.RenameField(
            model_name='powerupconstraints',
            old_name='power_up_id',
            new_name='power_up',
        ),
        migrations.RenameField(
            model_name='win',
            old_name='game_status_id',
            new_name='game_status',
        ),
        migrations.RenameField(
            model_name='winningmove',
            old_name='win_id',
            new_name='win',
        ),
    ]
