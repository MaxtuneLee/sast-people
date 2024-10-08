'use client';
import { editExperience } from '@/action/user/userInfo';
import { zodResolver } from '@hookform/resolvers/zod';
import { createInsertSchema } from 'drizzle-zod';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { user } from '@/db/schema';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../ui/card';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '@/components/ui/textarea';
import { userType } from '@/types/user';
import { toast } from 'sonner';

export const fullUserSchema = createInsertSchema(user, {
  github: z
    .string()
    .url()
    .transform((arg) => (arg ? arg : null)),
  blog: z
    .string()
    .url()
    .transform((arg) => (arg ? arg : null)),
  personalStatement: z.string().transform((arg) => (arg ? arg : null)),
});
export const experienceSchema = fullUserSchema.pick({
  github: true,
  blog: true,
  personalStatement: true,
});
export const ExperienceInfo = ({ initialInfo }: { initialInfo: userType }) => {
  const basicInfoForm = useForm<z.infer<typeof experienceSchema>>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      ...Object.fromEntries(
        Object.entries(initialInfo).map(([key, value]) => [key, value ?? '']),
      ),
    },
  });
  const { isSubmitting } = basicInfoForm.formState;
  return (
    <Card>
      <CardHeader>
        <CardTitle>我的能力</CardTitle>
        <CardDescription>
          请与我们分享你目前的兴趣与能力，以便找到最合适的部门
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...basicInfoForm}>
          <div className="space-y-2">
            <FormField
              control={basicInfoForm.control}
              name="github"
              disabled={isSubmitting}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub 主页地址</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="请填写你的GitHub主页地址"
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={basicInfoForm.control}
              disabled={isSubmitting}
              name="blog"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>博客地址</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="请填写你的博客地址"
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={basicInfoForm.control}
              disabled={isSubmitting}
              name="personalStatement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>自我介绍</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="请填写你的个人介绍"
                      {...field}
                      className="min-h-80"
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Form>
      </CardContent>
      <CardFooter>
        <Button
          onClick={basicInfoForm.handleSubmit(async (val) => {
            await editExperience(val);
            toast.success('个人信息保存成功');
          })}
          disabled={isSubmitting}
          loading={isSubmitting}
        >
          保存
        </Button>
      </CardFooter>
    </Card>
  );
};
