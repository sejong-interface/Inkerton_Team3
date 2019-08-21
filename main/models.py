from django.db import models

class Schedule(models.Model):
    title = models.CharField(max_length=80)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    bachelorChk = models.BooleanField()

    def __str__(self):
        return self.title

    def getNuguDate(self):
        return str(self.start_time.year)+'년 '+str(self.start_time.month)+'월 '+str(self.start_time.day)+'일'

    def getStartDate(self):
        return self.start_time.date()
    def getEndDate(self):
        return self.end_time.date()

class Error(models.Model):
    log=models.TextField()