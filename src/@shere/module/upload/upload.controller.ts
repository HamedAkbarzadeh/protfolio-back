import { Controller, Delete, NotFoundException, Param, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { join } from 'path';
import * as fs from 'fs'
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

    @Delete('remove/:filename')
    removeFile(@Param('filename') filename: string, @Req() req: Request) {
        const filePath = join(process.cwd(), `public/uploads/${req.query.folder || 'default'}`, filename);

        if (!fs.existsSync(filePath)) {
            throw new NotFoundException('File not found');
        }

        fs.unlinkSync(filePath);
        return { message: 'File deleted successfully' };

    }
}
