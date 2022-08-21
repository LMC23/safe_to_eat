FROM python:3.10-slim

WORKDIR /app

COPY . .

RUN pip install --upgrade pip setuptools wheel

RUN pip install -r requirements.txt 

RUN python init.py

EXPOSE 5000

CMD ["python", "app.py"]