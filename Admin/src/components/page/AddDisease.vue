<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 疾病录入
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form :model="formData" ref="formData" label-width="110px" class="demo-formData">
                    <el-form-item label="疾病名">
                        <el-input v-model="formData.name"></el-input>
                    </el-form-item>

                    <el-form-item label="图片">
                        <el-upload
                            :action="upload_qiniu_url"
                            ref="upload"
                            list-type="picture-card"
                            :data="qiniuData"
                            :limit="9"
                            :before-upload="beforeUpload1"
                            :on-success="handleSuccess1"
                            :on-error="handleError1"
                            :on-preview="handlePictureCardPreview"
                            :auto-upload="true"
                            style="margin-top: 20px;"
                        >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </el-form-item>

                    <el-form-item label="类型">
                        <el-input v-model="formData.type"></el-input>
                    </el-form-item>

                    <el-form-item label="介绍">
                        <el-input
                            v-model="formData.introduce"
                            type="textarea"
                            :autosize="{ minRows: 3}"
                        ></el-input>
                    </el-form-item>

                    <el-form-item label="高危人群">
                        <el-input
                            v-model="formData.highIncidence"
                        ></el-input>
                    </el-form-item>

                    <el-form-item label="预防措施">
                        <el-input
                            v-model="formData.prevebtivetreat"
                            type="textarea"
                            :autosize="{ minRows: 3}"
                        ></el-input>
                    </el-form-item>

                    <el-form-item class="button_submit">
                        <el-button type="primary" @click="submitForm('formData')">立即添加</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { addDisease, getQiniuToken } from '@/api/index.js';
import { uuid, getTime } from '@/assets/js/pubFuncs';

export default {
    name: 'basetable',
    data() {
        return {
            formData: {
                img: '',
                name: '',
                type: '',
                introduce: '',
                highIncidence: '',
                prevebtivetreat: ''
            },
            qiniuData: {
                key: '',
                token: ''
            },
            upload_qiniu_url: 'http://upload-z2.qiniup.com',
            // 七牛云返回储存图片的子域名
            upload_qiniu_addr: 'http://cdn.fengblog.xyz/',
            imageUrl: '',
            imagesLength: 0,
            dialogImageUrl: '',
            dialogVisible: false,
            formLabelWidth: '120px',

            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1
        };
    },
    created() {
        getQiniuToken().then(res => {
            this.qiniuData.token = res.data;
        });
    },
    methods: {
        // 添加商品
        submitForm() {
            addDisease(this.formData).then(res => {
                if (res.data.code === 0) {
                    this.$message({
                        message: '录入成功',
                        type: 'success'
                    });
                } else {
                    this.$message({
                        message: '录入失败',
                        type: 'error'
                    });
                }
            });
        },
        // 上传图片
        /*------------------------图片事件-----------------------*/
        beforeUpload1(file) {
            this.qiniuData.key = uuid() + file.name;
            const isJPG = file.type === 'image/jpeg';
            const isPNG = file.type === 'image/png';
            const isLt5M = file.size / 1024 / 1024 < 5;
            if (!isJPG && !isPNG) {
                this.$message.error('图片只能是 JPG/PNG 格式!');
                return false;
            }
            if (!isLt5M) {
                this.$message.error('图片大小不能超过 5MB!');
                return false;
            }
        },
        handleSuccess1(res, file) {
            this.formData.img = this.upload_qiniu_addr + res.key
        },
        handleError1(res) {
            this.$message({
                message: '上传失败',
                duration: 2000,
                type: 'warning'
            });
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}
.handle-select {
    width: 120px;
}
.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>