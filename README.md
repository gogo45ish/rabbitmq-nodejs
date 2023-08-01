# RabbitMQ/NodeJS
## Запуск приложения

Чтобы запустить приложение, выполните следующие действия:

1. Запустите API и производителя:

    ```
    nodemon server.js
    ```

2. Запустите потребителя:

    ``` 
    nodemon app.js
    ```
    
3. Выполните HTTP POST-запрос к конечной точке API:

    ```
    POST http://localhost:3000/sendLog

    body:
    {
        "message": "Message to process"
    }
    ```

4. Запрос будет обработан потребителем и отправлен ответ.