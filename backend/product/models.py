import uuid
from django.db import models
from django.utils.text import slugify
from category.models import Category


class Attribute(models.Model):
    attribute_name = models.CharField(max_length=255)
    value = models.CharField(max_length=255)

    def __str__(self):
        return self.attribute_name


class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    attributes = models.ManyToManyField(Attribute)
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to="media/products_img/")
    slug = models.SlugField(unique=True, blank=True, default=None)

    def save(self, *args, **kwargs):
        # Generar el slug automáticamente al guardar el producto
        if not self.slug:
            self.slug = slugify(self.name)
            # Asegurarse de que el slug sea único
            while Product.objects.filter(slug=self.slug).exists():
                self.slug = slugify(self.name) + '-' + str(uuid.uuid4())[:8]

        super(Product, self).save(*args, **kwargs)

    def __str__(self):
        return self.name
