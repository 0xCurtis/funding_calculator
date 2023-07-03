from django.db import models

# Create your models here.


class Funding(models.Model):
    pair = models.CharField(max_length=120)
    description = models.TextField()
    rate = models.FloatField()

    def _str_(self):
        return f'{self.pair} - {self.rate}'
    