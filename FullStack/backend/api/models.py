import datetime
# Create your models here.
from django.contrib.auth.models import AbstractUser, AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from .managers import CustomUserManager
from datetime import timedelta
from django.core.exceptions import ValidationError
import datetime
from django.utils.crypto import get_random_string
from PIL import Image
from django_resized import ResizedImageField

def legal_age(birthdate):
    if datetime.datetime.now() - timedelta(days = 365.25 * 18) < datetime.datetime.combine(birthdate, datetime.datetime.min.time()):
        raise ValidationError('You should be atleast 18 y.o to register')

class User(AbstractUser):
    email = models.EmailField(_("email address"), unique=True)
    middle_name = models.CharField(max_length = 50, blank = True, null = True)
    image = ResizedImageField(size = [300, 300], default = "profile_images/default.png", upload_to = "profile_images", crop = ['middle', 'center'])
    birthdate = models.DateField(validators = [legal_age])
    address = models.TextField(null = True, blank = True)
    email = models.EmailField(unique = True)

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ['first_name', 'last_name', 'birthdate', 'email']
    objects = CustomUserManager()
    
class Category(models.Model):
    name = models.CharField(max_length = 255)

class Product(models.Model):
    plu = models.CharField(max_length = 15, unique = True)
    image = models.ImageField(upload_to = "products", default = "products/no_preview.png")
    price = models.FloatField()
    name = models.CharField(max_length = 255)
    quantity = models.IntegerField(default = 0)
    category = models.ForeignKey(Category, on_delete = models.CASCADE)

    def __str__(self):
        return f"{self.name} - {self.quantity} units"

class Transaction(models.Model):
    cashier = models.ForeignKey(User, on_delete = models.CASCADE)
    date_time = models.DateTimeField(default = timezone.now)

class Sale(models.Model):
    transaction = models.ForeignKey(Transaction, on_delete = models.CASCADE)
    product = models.ForeignKey(Product, on_delete = models.CASCADE)
    price = models.FloatField()
    quantity = models.IntegerField()

class Variant(models.Model):
    product = models.ForeignKey(Product, on_delete = models.CASCADE)
    name = models.CharField(max_length = 150)

    def __str__(self):
        return self.name

class Option(models.Model):
    variant = models.ForeignKey(Variant, on_delete = models.CASCADE)
    name = models.CharField(max_length = 100)

    class Meta:
        unique_together = ('variant', 'name')

    def __str__(self):
        return f"{self.variant} - {self.name}" 

class VariantPrice(models.Model):
    option_1 = models.ForeignKey(Option, on_delete = models.CASCADE, related_name = "opt1")
    option_2 = models.ForeignKey(Option, on_delete = models.CASCADE, related_name = "opt2", null = True, blank = True)
    price = models.FloatField()

    class Meta:
        unique_together = ("option_1", "option_2")

    @property
    def product(self):
        return self.option_1.variant.product
    
    def __str__(self):
        return f"{self.option_1} {self.option_2 or ""} - {self.price}"
    

class FeatureProduct(models.Model):
    product = models.ForeignKey(Product, on_delete = models.CASCADE)
    max_display_count = models.IntegerField()
    display_count = models.IntegerField()
    active = models.BooleanField(default = True)

    def __str__(self):
        return self.product.name