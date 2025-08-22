import { Controller, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';

@Controller()
export class UploadController {

    @Post('image')
    @UseInterceptors(FileInterceptor('file'))
    uploadImage(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
        if (!file) {
            return { success: false, message: 'No file uploaded' }
        }
        const url = `/uploaded/${req.query.folder || 'default'}/${file.filename}`;
        return { success: true, url }
    }
}
