from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import *


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = User
    list_display = ("username", "email", "is_staff", "is_active",)
    list_filter = ("username", "email", "is_staff", "is_active",)
    fieldsets = (
        (None, {"fields": ("username", "password", "email", "image", "birthdate", "first_name", "last_name")}),
        ("Permissions", {"fields": ("is_staff", "is_active", "groups", "user_permissions")}),
    )
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": (
                "username", "email", "password1", "password2", "birthdate", "is_staff",
                "is_active", "groups", "user_permissions"
            )}
        ),
    )
    search_fields = ("email",)
    ordering = ("email",)

admin.site.register(User, CustomUserAdmin)

admin.site.register(Product)
admin.site.register(Transaction)
admin.site.register(Sale)
admin.site.register(Variant)
admin.site.register(Option)
admin.site.register(VariantPrice)
admin.site.register(FeatureProduct)
