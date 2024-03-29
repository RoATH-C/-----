<template>
  <div class="body">
    <div style="margin-top: 40%">
      <div>
        <el-button
          style="
            height: 10%;
            width: 40%;
            font-size: 25px;
            margin-top: 10%;
            background-color: rgb(0, 122, 255);
            color: white;
          "
          type="primary"
          @click="dialogVisible1 = true"
          plain
          >弘毅之星</el-button
        >
        <el-dialog
          v-model="dialogVisible1"
          title="弘毅之星评分细则"
          width="70%"
          :before-close="handleClose"
          style="text-align: left"
        >
          <div>
            1.
            不畏艰难，宽宏坚毅，奋发图强，对改变当前困境和自身命运有着强烈的责任感和使命感；
          </div>
          <div>
            2.
            在经济上积极寻求独立，通过勤工助学或课外兼职等方式获得劳动报酬，表现出顽强向上的毅力和积极乐观的精神；
          </div>
          <div>3. 孝敬父母，能承担起家庭重任，为父母分愁解忧；</div>
          <div>4. 学习刻苦，成绩优异，学年综合测评成绩居专业年级排名前列；</div>
          <div>5. 事例典型，事迹感人，教育引导作用强。</div>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogVisible1 = false">取消</el-button>
              <el-button
                type="primary"
                @click="(dialogVisible1 = false), toOne()"
              >
                确认
              </el-button>
            </span>
          </template>
        </el-dialog>
      </div>
      <div>
        <el-button
          style="
            height: 10%;
            width: 40%;
            font-size: 25px;
            margin-top: 10%;
            color: white;
            background-color: rgb(0, 122, 255);
          "
          type="primary"
          @click="dialogVisible2 = true"
          plain
          >博学之星</el-button
        >
        <el-dialog
          v-model="dialogVisible2"
          title="博学之星评分细则"
          width="70%"
          :before-close="handleClose"
          style="text-align: left"
        >
          <div>
            1.学习态度端正，学习方法科学，学习成绩特别优秀，综合测评智育成绩学年专业年级排名前3；
          </div>
          <div>
            2.努力推动学院学风建设，乐于帮助同学解决学习困难、传授学习方法、交流学习经验，与同学共同进步；
          </div>
          <div>
            3.积极参加各级各类专业技能考试或比赛且成绩突出，事迹感人，获得市级及以上相关奖励者优先。
          </div>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogVisible2 = false">取消</el-button>
              <el-button
                type="primary"
                @click="(dialogVisible2 = false), toTwo()"
              >
                确认
              </el-button>
            </span>
          </template>
        </el-dialog>
      </div>
      <div>
        <el-button
          style="
            height: 10%;
            width: 40%;
            font-size: 25px;
            margin-top: 10%;
            background-color: rgb(0, 122, 255);
            color: white;
          "
          type="primary"
          @click="(dialogVisible3 = true), toThree"
          plain
          >求真之星</el-button
        >
        <el-dialog
          v-model="dialogVisible3"
          title="求真之星评分细则"
          width="70%"
          :before-close="handleClose"
          style="text-align: left"
        >
          <div>
            1.具有创新意识和开拓精神，投身创新创业，成效明显，事迹感人；
          </div>
          <div>
            2.热爱科学，勤于思考，勇于探索，严谨求真，在学术科研领域和各级各类创新创业比赛中取得一定成绩；
          </div>
          <div>
            3.市级及以上科研项目主要完成人、发明专利获得者或计算机软件著作权者优先；
          </div>
          <div>
            4.为政府部门及企事业单位提供咨询、方案创意设计、技术服务等活动并受到好评者优先。
          </div>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogVisible3 = false">取消</el-button>
              <el-button
                type="primary"
                @click="(dialogVisible3 = false), toThree()"
              >
                确认
              </el-button>
            </span>
          </template>
        </el-dialog>
      </div>
      <div>
        <el-button
          style="
            height: 10%;
            width: 40%;
            font-size: 25px;
            margin-top: 10%;
            background-color: rgb(0, 122, 255);
            color: white;
          "
          type="primary"
          @click="(dialogVisible4 = true), toFour"
          plain
          >翘楚之星</el-button
        >
        <el-dialog
          v-model="dialogVisible4"
          title="翘楚之星评分细则"
          width="70%"
          :before-close="handleClose"
          style="text-align: left"
        >
          <div style="text-indent: 0">
            1.
            担任校院学生会、自律会、学工在线（易班）工作站、社团等各级各类学生组织主要负责人或积极参加捐资助学、校园服务、社区建设、环境保护、大型赛会、应急救助等校内外活动中表现优异，做出突出贡献；
          </div>
          <div style="text-indent: 0">
            2.为人正直善良、诚实守信，严以律已，宽以待人，有较强的事业心和责任感，工作务实肯干、无私奉献；
          </div>
          <div>
            3.工作积极主动、认真负责，富有开拓创新精神，具有较强的组织协调能力，工作成绩突出，获得市级及以上相关荣誉者或市级及以上表彰者或经媒体报道有良好的社会影响者优先；
          </div>
          <div style="text-indent: 0">
            4. 学年综合测评成绩居专业年级排名前列。
          </div>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogVisible4 = false">取消</el-button>
              <el-button
                type="primary"
                @click="(dialogVisible4 = false), toFour()"
              >
                确认
              </el-button>
            </span>
          </template>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script setup>
import router from "@/router";
import { onMounted, ref } from "vue";
const dialogVisible1 = ref(false);
const dialogVisible2 = ref(false);
const dialogVisible3 = ref(false);
const dialogVisible4 = ref(false);
onMounted(() => {});
const toOne = () => {
  router.push("/sortone");
};
const toTwo = () => {
  router.push("/sorttwo");
};
const toThree = () => {
  router.push("/sortthree");
};
const toFour = () => {
  router.push("/sortfour");
};
</script>
<style scoped>
.body {
  text-align: center;
}
.body {
  background-image: linear-gradient(
    to bottom right,
    #91defe,
    #99c0f9,
    #bdb6ec,
    #d7b3e3,
    #efb3d5,
    #f9bccc
  );
  height: 100%;
  position: absolute;
  top: 0px;
  padding: 15%;
  left: 0px;
  width: 100%;
}
</style>
