<template>
    <div class="fillcontain">
        <div>
            <el-form
                :inline="true"
                ref="search_data" 
                :model='search_data' >
                <el-form-item label="任务时间筛选:">
                    <el-date-picker
                        v-model="search_data.startTime"
                        type="datetime"
                        placeholder="选择开始时间">
                    </el-date-picker> --
                    <el-date-picker
                        v-model="search_data.endTime"
                        type="datetime"
                        placeholder="选择结束时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size ="small" icon="search" @click='onScreeoutMoney()'>筛选</el-button>
                </el-form-item>
                    <el-form-item class="btnRight">
                    <el-button type="primary" size ="small" icon="view" @click='onAddMoney()'>添加</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table_container">
            <el-table
                v-if="tableData.length > 0"
                :data='tableData'
                max-height="450"
                border
                :default-sort = "{prop: 'date', order: 'descending'}"
                style="width: 100%">
                 <el-table-column
                    type="index"
                    label="序号"
                    align='center'
                    width="70">
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="创建时间"
                    align='center'
                    width="250"
                    sortable>
                    <template slot-scope="scope">
                        <el-icon name="time"></el-icon>
                        <span style="margin-left: 10px">{{ scope.row.date }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="技术类型"
                    align='center'
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="describe"
                    label="技术描述"
                    align='center'
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="income"
                    label="主要技术栈"
                    align='center'
                    width="200"> 
                    <template slot-scope="scope">  
                        <span style="color:#00d053">{{ scope.row.income }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="expend"
                    label="已完成技术栈"
                    align='center'
                    width="170">
                    <template slot-scope="scope">  
                        <span style="color:#f56767">{{ scope.row.expend }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="cash"
                    label="项目名称"
                    align='center'
                    width="180">
                    <template slot-scope="scope">  
                        <span style="color:#4db3ff">{{ scope.row.cash }}</span>
                    </template>
                </el-table-column>
                 <el-table-column
                    prop="remark"
                    label="备注"
                    align='center'
                    width="280">
                </el-table-column>
                <el-table-column
                    prop="operation"
                    align='center'
                    label="操作"
                    fixed="right"
                    width="180">
                    <template slot-scope='scope'>
                        <el-button 
                            type="warning" 
                            icon='edit' 
                            size="small"
                            @click='onEditMoney(scope.row)'
                        >编辑</el-button>
                        <el-button 
                            type="danger" 
                            icon='delete' 
                            size="small"
                            @click='onDeleteMoney(scope.row,scope.$index)'
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
             <el-row>
                <el-col :span="24">
                    <div class="pagination">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="paginations.page_index"
                            :page-sizes="paginations.page_sizes"
                            :page-size="paginations.page_size"
                            :layout="paginations.layout"
                            :total="paginations.total">
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
        </div>
        <!-- 弹框页面 -->
        <DialogFound :dialog="dialog" :form="form" @update="getlist"></DialogFound>
    </div>
</template>
<script>
import DialogFound from './components/DialogFound'
export default {
    name:"foundlist",
    components:{
        DialogFound
    },
    data(){
        return{
            tableData: [],
            allTableData:[],//根据index和size过滤的数据
            filterTableData: [],//时间过滤后的数据
            dialog: {
                show: false,
                title: "",
                option: "edit"
            },
            form: {
                type: "",
                describe: "",
                income: "",
                expend: "",
                cash: "",
                remark: "",
                id: ""
            },
            //分页模板
            //需要给分页组件传的信息
            paginations: {
                page_index: 1, // 当前位于哪页
                total: 0, // 总数
                page_size: 5, // 1页显示多少条
                page_sizes: [5, 10, 15, 20], //每页显示多少条
                layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
            },
            search_data:{
                startTime:'',
                endTime:''
            },
        }
    },
    mounted(){
        this.getlist()
    },
    methods:{
        getlist(){
            this.$axios.get('/api/profiles/').then((res)=>{
                this.tableData=res.data;
                this.allTableData=res.data;
                this.filterTableData=res.data;
                // 设置分页数据
                this.setPaginations();
            }).catch(err=>{
                cosnole.log(err)
            })
        },
        //添加数据
        onAddMoney(){
            this.dialog= {
                show: true,
                title: "添加数据",
                option: "add"
            },
            this.form = {
                type: "",
                describe: "",
                income: "",
                expend: "",
                cash: "",
                remark: "",
                id: ""
            };

        },
        //修改数据
        onEditMoney(row){
            this.dialog= {
                show: true,
                title: "修改数据",
                option: "edit"
            },
            this.form =row
        },
        //删除数据
        onDeleteMoney(row,index){
            this.$axios.delete(`/api/profiles/delete/${row._id}`).then(res=>{
                console.log(res)
                this.$message("删除成功");
                this.getlist();
            }).catch(err=>{
                console.log(err)
            })
        },
        //分页方法
        handleSizeChange(val) {
            this.paginations.page_index=1;
            this.paginations.page_size=val;
            this.tableData=this.allTableData.filter((item,index)=>{
                return index<this.paginations.page_size
            })
        },
        handleCurrentChange(val) {
            // 当前页  每次根据点击的页标计算前几条数据不取，取完后边的数据在根据size展示出数据
            let sortNum=this.paginations.page_size*(val-1)
            let table=this.allTableData.filter((item,index)=>{
                return index >= sortNum;
            })
            // 设置默认分页数据
            this.tableData=table.filter((item,index)=>{
                return index < this.paginations.page_size
            })
        },
        //初始化分页数据
        setPaginations(){
            //总页数
            this.paginations.total=this.allTableData.length;
            this.paginations.page_index = 1;
            this.paginations.page_size = 5;
            //设置默认分页数据
            this.tableData=this.allTableData.filter((item,index)=>{
                return index<this.paginations.page_size
            })
        },
        //筛选功能
        onScreeoutMoney(){
            if(!this.search_data.startTime||!this.search_data.endTime){
                this.$message({
                    type: "warning",
                    message: "请选择时间区间"
                })
                this.getlist();
                return
            }
            const sTime=this.search_data.startTime.getTime();
            const eTime=this.search_data.endTime.getTime();
            this.allTableData=this.filterTableData.filter((item,index)=>{
                let date=new Date(item.date+'');
                let time = date.getTime();
                return time>=sTime && time<=eTime
            })
            this.setPaginations()
        }
    }
}
</script>
<style lang="scss" scoped>
.fillcontain {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnRight {
  float: right;
}
.pagination {
  text-align: right;
  margin-top: 10px;
}
</style>


