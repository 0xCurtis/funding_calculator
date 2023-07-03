from django.contrib import admin

# Register your models here.

from .models import Funding

class FundingAdmin(admin.ModelAdmin):
    list_display = ('pair', 'description', 'rate')
    

admin.site.register(Funding, FundingAdmin)