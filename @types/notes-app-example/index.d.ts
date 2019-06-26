import {Server} from 'next';
import {DefaultQuery} from 'next/router';

declare global {
    namespace Express {
        // Расширяем интерфейс объекта Request
        interface Request {
            // Добавляем ссылку на Next.js сервер, чтобы иметь к нему доступ в роутере
            nextApp: Server;
        }

        // Расширяем интерфейс объекта Response
        interface Response {
            // Добавляем функцию renderPage, которая будет использоваться для отрисовки страниц
            renderPage(pathname: string, query?: DefaultQuery): void;
        }
    }
}
