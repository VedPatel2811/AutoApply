# Use same Python version as Render
FROM python:3.11-slim

# Install system dependencies Render will need
RUN apt-get update && apt-get install -y \
    libpango-1.0-0 \
    libcairo2 \
    libgdk-pixbuf-xlib-2.0-0 \
    libffi-dev \
    libreoffice \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy requirements first (better caching)
COPY requirements.txt .

# Install python-bidi old version first then rest
RUN pip install python-bidi==0.4.2
RUN pip install -r requirements.txt

# Copy rest of project
COPY . .

# Run the app
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]