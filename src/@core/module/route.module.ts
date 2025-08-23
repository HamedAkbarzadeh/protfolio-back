import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AuthModule } from 'src/@auth/module/auth.module';
import { UploadModule } from 'src/@shere/module/upload/upload.module';
import { ContactModule } from 'src/contact/module/contact.module';
import { ProtfolioModule } from 'src/protfolio/module/protfolio.module';
import { SkillModule } from 'src/skill/module/skill.module';
import { UserModule } from 'src/user/module/user.module';
@Module({
    imports: [
        RouterModule.register([
            {
                path: 'api',
                children: [
                    {
                        path: 'auth',
                        module: AuthModule
                    },
                    {
                        path: 'users',
                        module: UserModule
                    },
                    {
                        path: 'skills',
                        module: SkillModule
                    },
                    {
                        path: 'protfolio',
                        module: ProtfolioModule
                    },
                    {
                        path: 'uploads',
                        module: UploadModule
                    },
                    {
                        path: 'contact',
                        module: ContactModule
                    }
                ],
            },
        ]),
    ],
})
export class RouteModule { }
