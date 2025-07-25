import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const ctx = context.switchToHttp()
        const res = ctx.getResponse();

        return next.handle().pipe(
            map((data: { success: boolean, result: object, status: number }) => {
                let msg: string;
                if (data.success == true) {
                    msg = 'The operation was successful.';
                } else {
                    msg = 'The operation failed.';
                }

                return {
                    status: res.statusCode,
                    msg,
                    success: data.success,
                    result: data.result
                }
            })
        )
    }
}